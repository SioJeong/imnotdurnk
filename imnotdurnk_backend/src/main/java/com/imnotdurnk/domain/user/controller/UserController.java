package com.imnotdurnk.domain.user.controller;

import com.imnotdurnk.domain.auth.dto.AuthDto;
import com.imnotdurnk.domain.auth.dto.TokenDto;
import com.imnotdurnk.domain.user.dto.LoginUserDto;
import com.imnotdurnk.domain.user.dto.UpdatedPasswordDto;
import com.imnotdurnk.domain.user.dto.UserDto;
import com.imnotdurnk.domain.user.service.UserServiceImpl;
import com.imnotdurnk.global.commonClass.CommonResponse;
import com.imnotdurnk.global.exception.InvalidDateException;
import com.imnotdurnk.global.exception.InvalidTokenException;
import com.imnotdurnk.global.exception.RequiredFieldMissingException;
import com.imnotdurnk.global.response.SingleResponse;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.UnsupportedEncodingException;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {

    private UserServiceImpl userService;

    /**
     * 이메일 인증 요청
     *
     * @param email 인증 요청할 이메일
     * @return SingleResponse 이메일 인증 요청의 결과를 담고 있는 응답 객체
     *         - 200: 메일 인증 요청 성공
     *         - 404: DB에 존재하지 않는 이메일
     *         - 400: 이메일 누락 또는 메일 인증 요청 실패
     *         - 500: 메일 전송 중 오류 / 예외 발생
     *
     * @throws Exception 처리되지 않은 예외
     */
    @GetMapping("/signup/verify")
    public ResponseEntity<?> verifyEmail(@RequestParam String email) throws BadRequestException, MessagingException, UnsupportedEncodingException {

        if(email == null || email.equals("")) throw new RequiredFieldMissingException("이메일 누락");

        userService.sendVerificationCode(email);
        CommonResponse response = new CommonResponse(200,"이메일 인증 요청");
        return ResponseEntity.status(response.getHttpStatus()).body(response);
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
    public ResponseEntity<?> verifyCode(@RequestParam String email, @RequestParam String code) throws Exception {

        if(email == null || email.equals("")) throw new RequiredFieldMissingException("이메일 누락");
        if(code == null || code.equals("")) throw new RequiredFieldMissingException("인증번호 누락");

        userService.verifyCode(email, code);
        CommonResponse response = new CommonResponse(200,"이메일 인증");
        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

    /**
     * 사용자 회원가입
     *
     * @param userDto 회원가입할 사용자 정보를 담은 {@link UserDto} 객체
     * @return 회원가입이 완료된 사용자 정보를 담은 {@link ResponseEntity} 객체
     * @throws BadRequestException 이메일, 비밀번호, 이름 중 하나라도 누락되거나 이미 사용 중인 이메일인 경우 발생하는 예외
     *         UserNotVerifiedException 이메일 인증 전이라면 UNAUTHORIZED(401) 응답
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody UserDto userDto) throws BadRequestException {

        if (userDto.getEmail() == null || !checkEmail(userDto.getEmail())) throw new BadRequestException("이메일이 누락되었거나 형식에 맞지 않습니다.");
        if (userDto.getPassword() == null || !checkpassword(userDto.getPassword())) throw new BadRequestException("비밀번호가 누락되었거나 형식에 맞지 않습니다.");
        if (userDto.getName() == null || !checkName(userDto.getName())) throw new BadRequestException("이름이 누락되었거나 형식에 맞지 않습니다.");
        if (userDto.getPhone() == null || !checkphone(userDto.getPhone())) throw new BadRequestException("전화번호가 누락되었거나 형식에 맞지 않습니다.");

        userService.existsByEmail(userDto.getEmail());
        userService.signUp(userDto);
        CommonResponse response = new CommonResponse(201,"회원가입 성공");
        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

    /**
     * 로그인 요청
     *
     * @param loginUserDto 로그인할 이메일과 비밀번호를 저장한 Dto
     * @return 로그인이 완료된 사용자의 인증 토큰을 header에 담은 {@link ResponseEntity} 객체
     * @throws BadRequestException 이메일, 비밀번호, 이름 중 하나라도 누락되거나 이미 사용 중인 이메일인 경우 발생하는 예외
     */
    @PostMapping("/login")
    public ResponseEntity<?> login (@RequestBody LoginUserDto loginUserDto) throws BadRequestException {

        if(loginUserDto.getEmail() == null || !checkEmail(loginUserDto.getEmail())) throw new BadRequestException("형식에 맞지 않는 이메일입니다.");
        if(loginUserDto.getPassword() == null) throw new RequiredFieldMissingException("비밀번호가 누락되었습니다.");

        AuthDto authDto = userService.login(loginUserDto);

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

        CommonResponse response = new CommonResponse(HttpStatus.OK.value(), "로그인 성공");

        return ResponseEntity.status(response.getHttpStatus())
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .header("Authorization", "Bearer " + accessTokenDto.getToken())
                .body(response);
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
    public ResponseEntity<?> sendNewPassword(@RequestParam String email) throws BadRequestException, MessagingException, UnsupportedEncodingException {

        if(email == null || email.equals("")) throw new RequiredFieldMissingException("이메일이 누락되었습니다.");

        userService.sendTemporaryPassword(email);
        CommonResponse response = new CommonResponse(200,"임시 비밀번호 발송 성공");
        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

    /**
     * 사용자 프로필 정보를 업데이트
     * @param token 사용자 인증 토큰
     * @param userDto 업데이트할 사용자 정보
     * @return 업데이트 성공 시 HTTP 200 OK, 실패 시 BadRequestException 발생
     * @throws BadRequestException 수정 요청이 실패한 경우 발생
     */
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestHeader("Authorization") String token, @RequestBody UserDto userDto) throws BadRequestException {

        if(token == null) throw new InvalidDateException("사용자 인증 정보가 존재하지 않습니다.");
        //수정된 정보 유효성 검사
        if(userDto.getPhone() == null || !checkphone(userDto.getPhone())) throw new BadRequestException("형식이 잘못된 전화번호입니다.");
        if(userDto.getNickname() != null && !checkName(userDto.getNickname())) throw new BadRequestException("형식이 잘못된 닉네임입니다.");

        userService.updateProfile(token,userDto);
        CommonResponse response = new CommonResponse(200,"사용자 프로필 정보 업데이트 성공");
        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

    /**
     * 사용자 프로필 정보 조회
     * @param token 사용자 인증 토큰
     * @return 사용자 정보담은 {@link UserDto} 반환
     * @throws BadRequestException 조회 실패 시 발생
     */
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String token) throws BadRequestException {

        if(token == null) throw new InvalidTokenException("인증 정보가 존재하지 않습니다.");

        UserDto user=userService.getProfile(token);
        SingleResponse response = new SingleResponse<>(200,"프로필 조회 성공",user);
        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

    /***
     * 로그아웃
     * @param refreshToken
     * @param accessToken
     * @return 로그아웃 완료
     */
    @PostMapping("logout")
    public ResponseEntity<?> logout (
            @RequestAttribute(value = "RefreshToken", required = false) String refreshToken,
            @RequestAttribute(value = "AccessToken", required = false) String accessToken) throws BadRequestException {

        if (refreshToken == null && accessToken == null){
            throw new BadRequestException("인증 정보가 존재하지 않습니다.");
        }

        userService.logout(accessToken, refreshToken);
        CommonResponse response = new CommonResponse(200,"로그아웃 성공");
        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

    @PostMapping("update-password")
    public ResponseEntity<?> updatePassword(@RequestAttribute(value = "AccessToken", required = true) String accessToken,
                                            @RequestBody UpdatedPasswordDto updatedPasswordDto) throws BadRequestException {

        //누락 확인
        if(updatedPasswordDto.getPrevPassword() == null || updatedPasswordDto.getPrevPassword().equals(""))
            throw new RequiredFieldMissingException("기존 비밀번호가 누락되었습니다.");
        if(updatedPasswordDto.getNewPassword() == null || updatedPasswordDto.getNewPassword().equals(""))
            throw new RequiredFieldMissingException("변경하려는 비밀번호가 누락되었습니다.");

        //신규 비밀번호 유효성 확인
        if(!checkpassword(updatedPasswordDto.getNewPassword())) throw new BadRequestException("잘못된 형식의 비밀번호입니다.");

        userService.updatePassword(accessToken, updatedPasswordDto);

        CommonResponse response = new CommonResponse();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("비밀번호 변경이 완료되었습니다.");
        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }


    //---유효성 체크 메소드------------------------------------------------------------

    /***
     * 이메일 유효성 체크
     *      abc@abc.com 형태
     * @param email
     * @return 기준에 부합하면 true, 아니면 false
     */
    public boolean checkEmail(String email) {
        return Pattern.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$", email);
    }

    /***
     * 이름, 닉네임 유효성 체크
     *      한글 2-10자
     * @param name
     * @return 기준에 부합하면 true, 아니면 false
     */
    public boolean checkName(String name) {
        return Pattern.matches("^[가-힣]{2,10}$", name);
    }

    /***
     * 비밀번호 유효성 체크
     *      대소문자 각각 1개 이상, 숫자 포함 / 8-16자
     * @param password
     * @return 기준에 부합하면 true, 아니면 false
     */
    public boolean checkpassword(String password) {
        return Pattern.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,16}$", password);
    }

    /***
     * 핸드폰 번호 유효성 체크
     *      000-0000-000
     * @param phone
     * @return 기준에 부합하면 true, 아니면 false
     */
    public boolean checkphone(String phone) {
        return Pattern.matches("^(01[0-9])-\\d{4}-\\d{4}$", phone);
    }


}
