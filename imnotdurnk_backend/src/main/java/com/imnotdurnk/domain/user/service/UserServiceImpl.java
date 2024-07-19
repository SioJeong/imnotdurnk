package com.imnotdurnk.domain.user.service;

import com.imnotdurnk.domain.auth.dto.AuthDto;
import com.imnotdurnk.domain.auth.dto.TokenDto;
import com.imnotdurnk.domain.auth.enums.TokenType;
import com.imnotdurnk.domain.auth.service.AuthService;
import com.imnotdurnk.domain.user.dto.UserDto;
import com.imnotdurnk.domain.user.entity.UserEntity;
import com.imnotdurnk.domain.user.repository.UserRepository;
import com.imnotdurnk.global.util.JwtUtil;
import com.imnotdurnk.global.util.RedisUtil;
import com.imnotdurnk.global.util.SystemUtil;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
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
    @Autowired
    private JavaMailSenderImpl mailSender;


    /**
     * 이메일 체크
     *
     * @param email 이미 등록되어있는지 확인하고자 하는 이메일
     * @return 입력된 이메일의 기존 등록 여부를 반환
     */
    @Override
    public boolean existsByEmail(String email){
        return userRepository.existsByEmail(email);
    }

    /**
     * 회원가입
     *
     * @param userDto - 회원가입 정보를 저장하는 {@link UserDto} 객체
     * @return 회원가입이 완료된 {@link UserDto} 객체
     *
     */
    @Override
    public boolean signUp(UserDto userDto) {
        //비밀번호 암호화
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        UserEntity user = userDto.toEntity();
        if (userRepository.save(user).getName().equals(userDto.getName())) {
            return true;
        };
        return false;
    }

    /**
     * 사용자에게 이메일 인증 코드를 전송
     *
     * @param email 인증 코드를 전송할 이메일 주소
     * @return 인증 코드 전송 성공 여부
     * @throws MessagingException 이메일 전송 중 오류 발생 시 예외 발생
     */
    @Override
    public boolean sendVerificationCode(String email) throws MessagingException, UnsupportedEncodingException {

        //인증번호 생성
        Random random = new Random();
        String verificationCode = String.valueOf(random.nextInt(999999));

        if(sendMail(email, "회원 인증 메일입니다.", verificationCode)){

            //Redis 저장소에 인증번호-메일을 5분동안 저장
            redisUtil.setDataExpire(verificationCode, email,60*5L);
            return true;
        }else{
            return false;
        }
    }

    /**
     * 로그인
     *
     * @param email - 로그인을 시도한 이메일
     * @param password - 로그인을 시도한 비밀번호
     * @return 이메일로 찾은 유저의 비밀번호와 입력된 비밀번호가 일치할 경우 토큰 정보를 담은 {@link AuthDto} 객체를,
     *          비밀번호가 일치하지 않을 경우 null 반환
     */
    @Override
    public AuthDto login(String email, String password) throws BadRequestException{

        //로그인한 사용자 정보를 담은 entity
        UserEntity user = userRepository.findByEmail(email);

        //이메일이 일치하는 회원이 없는 경우
        if(user == null){
            throw new BadRequestException("일치하는 회원이 존재하지 않습니다.");
        }

        //비밀번호가 일치한 경우
        if(passwordEncoder.matches(password,user.getPassword())){

            //토큰 생성
            TokenDto accessToken = jwtUtil.generateToken(user.getEmail(), TokenType.ACCESS);
            TokenDto refreshToken = jwtUtil.generateToken(user.getEmail(), TokenType.REFRESH);

            AuthDto authDto = new AuthDto();
            authDto.setAccessToken(accessToken);
            authDto.setRefreshToken(refreshToken);

            return authDto;
        }

        //비밀번호가 일치하는 회원이 없는 경우
        else throw new BadRequestException("비밀번호가 일치하지 않습니다.");
    }

    /**
     * 임시 비밀번호 발송
     * 임시 비밀번호를 랜덤으로 생성하여 회원정보 변경 후 생성된 비밀번호를 이메일로 전송
     *
     * @param email 임시 비밀번호를 받고자 하는 이메일 계정
     * @return 이메일 정상 전송 여부
     */
    @Override
    public boolean sendTemporaryPassword(String email) throws MessagingException, UnsupportedEncodingException {
        String tmpPassword = SystemUtil.generateRandomMixStr(TMP_PASSWORD_LENGTH, PASS_UPPER);
        String title = "임시 비밀번호 입니다.";

        if (sendMail(email, title, tmpPassword)) {
            UserEntity user = userRepository.findByEmail(email);
            user.setPassword(passwordEncoder.encode(tmpPassword));
            userRepository.save(user);
            return true;
        }

        return false;
    }

    /**
     * 이메일 전송
     * 주어진 이메일 주소, 제목, 코드를 사용하여 이메일을 보냄
     *
     * @param email 이메일을 보낼 주소
     * @param title 이메일의 제목
     * @param code 이메일 본문에 포함될 코드
     * @return 이메일 전송이 성공하면 true, 실패하면 false를 반환
     * @throws MessagingException 이메일 생성 또는 전송 중 오류가 발생할 경우
     * @throws UnsupportedEncodingException 지원되지 않는 문자 인코딩을 사용할 경우
     *
     * @param email 수신 메일 주소
     * @param title 발송 메일 제목
     * @param code 전송할 코드 (임시비밀번호 또는 인증번호)
     * @return 메일 전송 성공 여부
     * @throws MessagingException
     * @throws UnsupportedEncodingException
     */
    @Override
    public boolean sendMail(String email, String title, String code) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = emailsender.createMimeMessage();
        message.addRecipients(Message.RecipientType.TO, email);
        message.setSubject(title);// 제목

        //내용
        String msg = "";
        msg += "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msg += "<h3 style='color:black;'>"+title+"</h3>";
        msg += "<div style='font-size:130%'>";
        msg += "CODE : <strong>";
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
        return true;
    }

    /**
     * 주어진 이메일 주소와 인증 코드를 확인하고 일치하면 verified 상태를 업데이트함
     *
     * @param email 인증할 이메일 주소
     * @param verificationCode 사용자가 입력한 인증 코드
     * @return 인증 코드가 일치하면 true, 일치하지 않으면 false를 반환
     */
    @Override
    public boolean verifyCode(String email, String verificationCode) {
        if(redisUtil.getData(verificationCode)==null){  //redis 저장소에 해당 코드가 존재하지 않음
            return false;
        }
        if(redisUtil.getData(verificationCode).equals(email)){  //인증코드와 이메일이 일치함
            UserEntity user = userRepository.findByEmail(email);
            user.setVerified(true);
            userRepository.save(user);
            return true;
        }else{  //코드와 이메일이 일치하지 않음
            return false;
        }
    }

    /***
     * 로그아웃
     * access token을 무효화하기 위해 블랙리스트에 추가
     * refresh token을 무효화하기 위해 redis에서 삭제
     * @param accessToken
     * @param refreshToken
     */
    @Override
    public void logout(String accessToken, String refreshToken) {

        // access token 무효화
        if (accessToken != null && jwtUtil.isValidToken(accessToken, TokenType.ACCESS)) {
            authService.addAccessTokenToBlackListInRedis(accessToken);
        }

        // refresh token 무효화
        if (refreshToken != null && jwtUtil.isValidToken(refreshToken, TokenType.REFRESH)) {
            authService.deleteRefreshTokenInRedis(refreshToken);
        }

    }
}
