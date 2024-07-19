package com.imnotdurnk.domain.user.controller;
import com.imnotdurnk.domain.auth.dto.AuthDto;
import com.imnotdurnk.domain.auth.dto.TokenDto;
import com.imnotdurnk.domain.user.dto.UserDto;
import com.imnotdurnk.domain.user.service.UserServiceImpl;
import jakarta.mail.MessagingException;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    /**
     * 사용자 이메일 중복 체크 / 이메일 인증 요청
     *
     * @param email 중복 체크 / 인증 요청할 이메일
     * @return 이메일 사용 가능 여부를 나타냄
     * @throws BadRequestException 이메일이 이미 사용 중인 경우 발생하는 예외
     */
    @GetMapping("/signup/verify")
    public ResponseEntity<?> verifyEmail(@RequestParam String email) throws BadRequestException, MessagingException, UnsupportedEncodingException {
        if (email == null || email.isEmpty()) {
            throw new BadRequestException("이메일 누락");
        }

        if (!userService.existsByEmail(email)) {
            throw new BadRequestException("존재하지 않는 이메일");
        }

        //이메일로 인증 번호 전송
        if(userService.sendVerificationCode(email)){
            return ResponseEntity.status(HttpStatus.OK).body("메일 인증 요청 성공");
        }else{
            throw new BadRequestException("메일 인증 요청 실패");
        }
    }

    /**
     * 이메일 인증 코드 확인
     *
     * @param email 인증 코드를 받은 이메일 주소
     * @param code  사용자가 입력한 인증 코드
     * @return 인증 성공 시 OK(200) 응답, 실패 시 BadRequest(400) 응답
     * @throws BadRequestException 필수 정보 누락 시 발생
     */
    @PostMapping("/signup/verify-code")
    public ResponseEntity<?> verifyCode(@RequestParam String email, String code) throws BadRequestException {
        if(email == null || email.isEmpty()) {
            throw new BadRequestException("필수 정보 누락");
        }
        else if(userService.verifyCode(email, code)) {
            return ResponseEntity.status(HttpStatus.OK).body("메일 인증 성공");
        } else{
            throw new BadRequestException("메일 인증 실패");
        }
    }

    /**
     * 사용자 회원가입
     *
     * @param userDto 회원가입할 사용자 정보를 담은 {@link UserDto} 객체
     * @return 회원가입이 완료된 사용자 정보를 담은 {@link ResponseEntity} 객체
     * @throws BadRequestException 이메일, 비밀번호, 이름 중 하나라도 누락되거나 이미 사용 중인 이메일인 경우 발생하는 예외
     */
    @PostMapping("/signup")
    public ResponseEntity<Void> signUp(@RequestBody UserDto userDto) throws BadRequestException {
        if(userDto.getEmail()==null) {
            throw new BadRequestException("이메일 누락");
        }else if(userDto.getPassword()==null) {
            throw new BadRequestException("비밀번호 누락");
        }else if(userDto.getName()==null){
            throw new BadRequestException("이름 누락");
        }else if(userService.existsByEmail(userDto.getEmail())){
            throw new BadRequestException("이미 존재하는 이메일");
        }else{
            userDto.setVerified(false);
            if (userService.signUp(userDto)) {
                return ResponseEntity.status(HttpStatus.CREATED).build();
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    /**
     * 로그인 요청
     *
     * @param email 로그인을 시도할 이메일
     * @param password 로그인을 시도할 비밀번호
     * @return 로그인이 완료된 사용자의 인증 토큰을 header에 담은 {@link ResponseEntity} 객체
     * @throws BadRequestException 이메일, 비밀번호, 이름 중 하나라도 누락되거나 이미 사용 중인 이메일인 경우 발생하는 예외
     */
    @GetMapping("/login")
    public ResponseEntity<?> login
    (@RequestParam String email, @RequestParam String password) throws BadRequestException{

        if (!userService.existsByEmail(email)) {
            throw new BadRequestException("존재하지 않는 이메일입니다.");
        }

        AuthDto authDto = userService.login(email, password);

        TokenDto accessTokenDto = authDto.getAccessToken();
        TokenDto refreshTokenDto = authDto.getRefreshToken();

        // RefreshToken은 cookie에 httpOnly를 통해 전달
        long maxAge = (refreshTokenDto.getExpirationTime() - refreshTokenDto.getIssuedAt()) / 1000;

        ResponseCookie responseCookie = ResponseCookie
                .from("RefreshToken", refreshTokenDto.getToken())
                .domain("localhost") // 어떤 사이트에서 쿠키를 사용할 수 있도록 허용할 지 설정.
                .path("/") // 위 사이트에서 쿠키를 허용할 경로를 설정.
                .httpOnly(true) // HTTP 통신을 위해서만 사용하도록 설정.
                .secure(true) // Set-Cookie 설정.
                .maxAge(maxAge) // RefreshToken과 동일한 만료 시간으로 설정.
                .sameSite("None") // 동일한 사이트에서 사용할 수 있도록 설정 None: 동일한 사이트가 아니어도 된다.
                .build();


        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .header("Authorization", "Bearer " + accessTokenDto.getToken())
                .build();
    }

    /**
     *
     * @param email 임시 비밀번호를 수신받을 이메일 주소
     * @return
     * @throws BadRequestException 이메일 전송에 실패한 경우
     * @throws MessagingException
     * @throws UnsupportedEncodingException
     */
    @GetMapping("/login/find-password")
    public ResponseEntity<String> sendNewPassword(@RequestParam String email) throws BadRequestException, MessagingException, UnsupportedEncodingException {

        if (!userService.existsByEmail(email)) {
            throw new BadRequestException("존재하지 않는 이메일입니다.");
        }

        String msg;
        if(userService.sendTemporaryPassword(email)) {
            msg = "임시 비밀번호를 이메일로 전송했습니다.";
            return ResponseEntity.status(HttpStatus.OK).body(msg);
        }
        msg = "임시 비밀번호 발급에 실패했습니다. 다시 시도해주세요.";
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(msg);
    }
}
