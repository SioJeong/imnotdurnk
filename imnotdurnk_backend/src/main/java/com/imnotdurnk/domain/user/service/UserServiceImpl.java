package com.imnotdurnk.domain.user.service;

import com.imnotdurnk.domain.auth.enums.TokenType;
import com.imnotdurnk.domain.auth.dto.AuthDto;
import com.imnotdurnk.domain.auth.dto.TokenDto;
import com.imnotdurnk.domain.auth.service.AuthService;
import com.imnotdurnk.domain.user.dto.LoginUserDto;
import com.imnotdurnk.domain.user.dto.UserDto;
import com.imnotdurnk.domain.user.entity.UserEntity;
import com.imnotdurnk.domain.user.repository.UserRepository;
import com.imnotdurnk.global.exception.RequiredFieldMissingException;
import com.imnotdurnk.global.exception.ResourceNotFoundException;
import com.imnotdurnk.global.exception.UserNotVerifiedException;
import com.imnotdurnk.global.util.JwtUtil;
import com.imnotdurnk.global.util.RedisUtil;
import com.imnotdurnk.global.util.SystemUtil;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.BeanUtils;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Random;
import java.util.regex.Pattern;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender emailsender;

    @Autowired
    private RedisUtil redisUtil;

    @Autowired
    private SystemUtil systemUtil;

    @Autowired
    private JwtUtil jwtUtil;

    @Value("${spring.application.title}")
    private String applicationTitle;

    @Autowired
    private AuthService authService;


    /**
     * 임시 비밀번호 형식: 길이, 대소문자 여부
     */
    private static final int TMP_PASSWORD_LENGTH = 8;
    private static final boolean PASS_UPPER = true;

    private JavaMailSenderImpl mailSender;


    /**
     * 이메일 체크
     *
     * @param email 이미 등록되어있는지 확인하고자 하는 이메일
     * @return 입력된 이메일의 기존 등록 여부를 반환
     */
    @Override
    public boolean existsByEmail(String email) {
        if(userRepository.existsByEmail(email)) return true;
        else return false;
    }

    /***
     * 탈퇴한 회원인지 확인
     * @param email
     * @return 탈퇴한 회원이면 false
     */
    @Override
    public boolean isDeletedUser(String email) {
        return userRepository.findDeletedByEmail(email).getDeleted();
    }


    /**
     * 회원가입
     *
     * @param userDto - 회원가입 정보를 저장하는 {@link UserDto} 객체
     */
    @Override
    public void signUp(UserDto userDto) throws BadRequestException{

        if (userDto.getEmail() == null) throw new RequiredFieldMissingException("이메일 누락");
        if (userDto.getPassword() == null) throw new RequiredFieldMissingException("비밀번호 누락");
        if (userDto.getName() == null) throw new RequiredFieldMissingException("이름 누락");
        if (userDto.getPhone() == null) throw new RequiredFieldMissingException("전화번호 누락");

        //입력 받은 정보(이름, 이메일, 비밀번호, 전화번호) 유효성 체크
        if (!checkName(userDto.getName())) throw new BadRequestException("형식에 맞지 않는 이름입니다.");
        if (!checkEmail(userDto.getEmail())) throw new BadRequestException("형식에 맞지 않는 이메일입니다.");
        if (!checkpassword(userDto.getPassword())) throw new BadRequestException("형식에 맞지 않는 비밀번호입니다.");
        if (!checkphone(userDto.getPhone())) throw new BadRequestException("형식에 맞지 않는 전화번호입니다");

        //비밀번호 암호화
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        UserEntity user = userDto.toEntity();
        user.setDeleted(false);
        if (!userRepository.save(user).getName().equals(userDto.getName())) throw new BadRequestException("저장 실패");
    }

    /**
     * 사용자에게 이메일 인증 코드를 전송
     *
     * @param email 인증 코드를 전송할 이메일 주소
     * @throws MessagingException 이메일 전송 중 오류 발생 시 예외 발생
     */
    @Override
    public void sendVerificationCode(String email) throws MessagingException, UnsupportedEncodingException, BadRequestException {

        if (email == null || email.isEmpty()) throw new RequiredFieldMissingException("이메일 누락");
        if (!existsByEmail(email)) throw new ResourceNotFoundException("이메일이 존재하지 않음");

        //인증번호 생성
        Random random = new Random();
        String verificationCode = String.valueOf(random.nextInt(999999));

        try {
            sendMail(email, "회원 인증 메일입니다.", verificationCode, "코드");
        } catch (MessagingException e) {
            throw new MessagingException(e.getMessage());
        }
        //Redis 저장소에 인증번호-메일을 5분동안 저장
        redisUtil.setDataExpire(verificationCode, email,60*5L);

    }

    /**
     * 로그인
     *
     * @param loginUserDto 로그인 시도할 아이디와 비밀번호를 담은 객체
     * @return 이메일로 찾은 유저의 비밀번호와 입력된 비밀번호가 일치할 경우 토큰 정보를 담은 {@link AuthDto} 객체를,
     *          비밀번호가 일치하지 않을 경우 null 반환
     */
    @Override
    public AuthDto login(LoginUserDto loginUserDto) throws BadRequestException {
        String email = loginUserDto.getEmail();
        String password = loginUserDto.getPassword();

        //로그인한 사용자 정보를 담은 entity
        UserEntity user = userRepository.findByEmail(email);

        //이메일이 일치하는 회원이 없는 경우
        if (user == null) throw new BadRequestException("일치하는 회원이 존재하지 않습니다.");

        //이미 탈퇴한 회원인 경우 (true == 탈퇴)
        if (isDeletedUser(email)) throw new BadRequestException("탈퇴한 회원입니다.");

        //비밀번호가 일치하는 회원이 없는 경우
        if (!passwordEncoder.matches(password,user.getPassword())) throw new BadRequestException("비밀번호가 일치하지 않습니다.");

        //이메일 인증 전인 경우
        if (user.getVerified() == false) throw new UserNotVerifiedException("이메일이 인증되지 않았습니다.");

        //토큰 생성
        TokenDto accessToken = jwtUtil.generateToken(user.getEmail(), TokenType.ACCESS);
        TokenDto refreshToken = jwtUtil.generateToken(user.getEmail(), TokenType.REFRESH);

        //리프레시 토큰 redis 저장
        authService.saveRefreshTokenInRedis(refreshToken);
        
        AuthDto authDto = new AuthDto();
        authDto.setAccessToken(accessToken);
        authDto.setRefreshToken(refreshToken);

        return authDto;

    }

    /**
     * 임시 비밀번호 발송
     * 임시 비밀번호를 랜덤으로 생성하여 회원정보 변경 후 생성된 비밀번호를 이메일로 전송
     *
     * @param email 임시 비밀번호를 받고자 하는 이메일 계정
     */
    @Override
    public void sendTemporaryPassword(String email) throws MessagingException, UnsupportedEncodingException, BadRequestException {

        //이메일이 존재하지 않는 경우
        if (!existsByEmail(email)) throw new BadRequestException("존재하지 않는 이메일");

        //탈퇴한 회원인 경우
        if(isDeletedUser(email)) throw new BadRequestException("탈퇴한 회원");


        String tmpPassword = SystemUtil.generateRandomMixStr(TMP_PASSWORD_LENGTH, PASS_UPPER);
        String title = "임시 비밀번호 입니다.";

        try {
            sendMail(email, title, tmpPassword, "비밀번호");
        } catch (MessagingException e) {
            throw new MessagingException();
        }

        UserEntity user = userRepository.findByEmail(email);
        user.setPassword(passwordEncoder.encode(tmpPassword));
        userRepository.save(user);

    }

    /**
     * 이메일 전송
     * 주어진 이메일 주소, 제목, 코드를 사용하여 이메일을 보냄
     *
     * @param email 이메일을 보낼 주소
     * @param title 이메일의 제목
     * @param code  이메일 본문에 포함될 코드
     * @param email 수신 메일 주소
     * @param title 발송 메일 제목
     * @param code  전송할 코드 (임시비밀번호 또는 인증번호)
     * @return 메일 전송 성공 여부
     * @throws MessagingException           이메일 생성 또는 전송 중 오류가 발생할 경우
     * @throws UnsupportedEncodingException 지원되지 않는 문자 인코딩을 사용할 경우
     * @throws MessagingException
     * @throws UnsupportedEncodingException
     */
    @Override
    public void sendMail(String email, String title, String code, String codeName) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = emailsender.createMimeMessage();
        message.addRecipients(Message.RecipientType.TO, email);
        message.setSubject(title);// 제목

        //내용
        String msg = "";
        msg += "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msg += "<h3 style='color:black;'>"+title+"</h3>";
        msg += "<div style='font-size:130%'>";
        msg += codeName+" : <strong>";
        msg += code + "</strong><div><br/> ";
        msg += "</div>";
        message.setText(msg, "utf-8", "html");// 내용, charset 타입, subtype

        message.setFrom(new InternetAddress(mailSender.getUsername(), applicationTitle));// 보내는 사람

        try {
            emailsender.send(message);
        } catch (MailException es) {
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
    }

    /**
     * 주어진 이메일 주소와 인증 코드를 확인하고 일치하면 verified 상태를 업데이트함
     *
     * @param email 인증할 이메일 주소
     * @param verificationCode 사용자가 입력한 인증 코드
     * @return 인증 코드가 일치하면 true, 일치하지 않으면 false를 반환
     */
    @Override
    public boolean verifyCode(String email, String verificationCode) throws BadRequestException {
        if (email == null || email.isEmpty()) throw new BadRequestException("메일 정보 누락");

        if (redisUtil.getData(verificationCode)==null){  //redis 저장소에 해당 코드가 존재하지 않음
            return false;
        }
        if (redisUtil.getData(verificationCode).equals(email)){  //인증코드와 이메일이 일치함
            UserEntity user = userRepository.findByEmail(email);
            user.setVerified(true);
            userRepository.save(user);
            return true;
        } else {  //코드와 이메일이 일치하지 않음
            return false;
        }
    }

    /**
     * 사용자 정보를 추가합니다.
     *
     * @param token   사용자 인증 토큰
     * @param userDto 업데이트할 사용자 정보
     */
    @Override
    public void updateProfile(String token, UserDto userDto) throws BadRequestException {
        UserEntity user = userRepository.findByEmail(jwtUtil.getUserEmail(token, TokenType.ACCESS));
        if (user==null) throw new BadRequestException("일치하는 회원이 없음");

        UserEntity updateUser = userDto.toEntity();
        BeanUtils.copyProperties(updateUser, user, systemUtil.getNullPropertyNames(updateUser));
        userRepository.save(user);

    }

    public UserDto getProfile(String token) throws BadRequestException {
        UserEntity user = userRepository.findByEmail(jwtUtil.getUserEmail(token, TokenType.ACCESS));
        if (user == null) throw new BadRequestException("일치하는 회원 없음");
        UserDto profile = user.toDto();
        BeanUtils.copyProperties(profile, user, systemUtil.getNullPropertyNames(profile));
        userRepository.save(user);
        return profile;
    }

    /***
     * 로그아웃
     * access token을 무효화하기 위해 블랙리스트에 추가
     * refresh token을 무효화하기 위해 redis에서 삭제
     * @param accessToken
     * @param refreshToken
     */
    @Override
    public void logout(String accessToken, String refreshToken) throws BadRequestException {

        //access token과 refresh token이 모두 존재하지 않는 경우
        if (refreshToken == null && accessToken == null){
            throw new BadRequestException("인증 정보가 존재하지 않습니다.");
        }

        // access token 무효화
        if (accessToken != null && jwtUtil.isValidToken(accessToken, TokenType.ACCESS)) {
            authService.addAccessTokenToBlackListInRedis(accessToken);
        }

        // refresh token 무효화
        if (refreshToken != null && jwtUtil.isValidToken(refreshToken, TokenType.REFRESH)) {
            authService.deleteRefreshTokenInRedis(refreshToken);
        }

    }

    /***
     * 이메일 유효성 체크
     *      abc@abc.com 형태
     * @param email
     * @return 기준에 부합하면 true, 아니면 false
     */
    @Override
    public boolean checkEmail(String email) {
        return Pattern.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$", email);
    }

    /***
     * 이름, 닉네임 유효성 체크
     *      한글 2-10자
     * @param name
     * @return 기준에 부합하면 true, 아니면 false
     */
    @Override
    public boolean checkName(String name) {
        return Pattern.matches("^[가-힣]{2,10}$", name);
    }

    /***
     * 비밀번호 유효성 체크
     *      대소문자 각각 1개 이상, 숫자 포함 / 8-16자
     * @param password
     * @return 기준에 부합하면 true, 아니면 false
     */
    @Override
    public boolean checkpassword(String password) {
        return Pattern.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,16}$", password);
    }

    /***
     * 핸드폰 번호 유효성 체크
     *      000-0000-000
     * @param phone
     * @return 기준에 부합하면 true, 아니면 false
     */
    @Override
    public boolean checkphone(String phone) {
        return Pattern.matches("^(01[0-9])-\\d{4}-\\d{4}$", phone);
    }




}
