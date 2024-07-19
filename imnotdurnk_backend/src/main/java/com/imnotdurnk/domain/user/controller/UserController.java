package com.imnotdurnk.domain.user.controller;
import com.imnotdurnk.domain.user.dto.UserDto;
import com.imnotdurnk.domain.user.service.UserServiceImpl;
import jakarta.mail.MessagingException;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
        //이메일 중복 확인
        if (userService.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 존재하는 이메일");
        }
        //이메일로 인증 번호 전송
        if(userService.sendVerificationCode(email)){
            return ResponseEntity.status(HttpStatus.OK).body("메일 인증 요청 성공");
        }else{
            throw new BadRequestException("메일 인증 요청 실패");
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
    public ResponseEntity<UserDto> signUp(@RequestBody UserDto userDto) throws BadRequestException {
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
            UserDto savedUser = userService.signUp(userDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        }
    }

    /**
     * 로그인 요청
     *
     * @param email 로그인을 시도할 이메일
     * @param password 로그인을 시도할 비밀번호
     * @return 로그인이 완료된 사용자 정보를 담은 {@link ResponseEntity} 객체
     * @throws BadRequestException 입력된 이메일이 회원으로 존재하지 않거나, 이메일에 해당하는 비밀번호가 일치하지 않을 경우 예외 발생
     */
    @GetMapping("/login")
    public ResponseEntity<UserDto> login (@RequestParam String email, @RequestParam String password) throws BadRequestException {

        if (!userService.existsByEmail(email)) {
            throw new BadRequestException("존재하지 않는 이메일입니다.");
        }

        UserDto loginedUser = userService.login(email, password);
        if (loginedUser == null) {
            throw new BadRequestException("비밀번호가 일치하지 않습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(loginedUser);
        }
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

    /**
     * 사용자 프로필 정보를 업데이트
     * @param token 사용자 인증 토큰
     * @param userDto 업데이트할 사용자 정보
     * @return 업데이트 성공 시 HTTP 200 OK, 실패 시 BadRequestException 발생
     * @throws BadRequestException 수정 요청이 실패한 경우 발생
     */
    @PutMapping("mypage/profile")
    public ResponseEntity<String> updateProfile(@RequestHeader("Authorization") String token, @RequestBody UserDto userDto) throws BadRequestException {
        if(!userService.updateProfile(token,userDto)){
            throw new BadRequestException("수정 요청 실패");
        }else{
            return ResponseEntity.status(HttpStatus.OK).build();
        }
    }

    /**
     * 사용자 프로필 정보를 업데이트
     * @param token 사용자 인증 토큰
     * @return 사용자 정보담은 {@link UserDto} 반환
     * @throws BadRequestException 조회 실패 시 발생
     */
    @GetMapping("mypage/profile")
    public ResponseEntity<UserDto> getProfile(@RequestHeader("Authorization") String token) throws BadRequestException {
        UserDto user=userService.getProfile(token);
        if(user==null){
            throw new BadRequestException("사용자 정보 조회 실패");
        }else{
            return ResponseEntity.status(HttpStatus.OK).body(user);
        }
    }
}
