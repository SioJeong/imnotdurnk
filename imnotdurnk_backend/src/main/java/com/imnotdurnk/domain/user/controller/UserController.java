package com.imnotdurnk.domain.user.controller;
import com.imnotdurnk.domain.user.dto.UserDto;
import com.imnotdurnk.domain.user.service.UserService;
import jakarta.mail.MessagingException;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.Random;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

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
        if(userService.sendVerificationCode(email)==true){
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
        }else if(userService.existsByEmail(userDto.getEmail())==true){
            throw new BadRequestException("이미 존재하는 이메일");
        }else{
            userDto.setVerified(false);
            UserDto savedUser = userService.signUp(userDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        }
    }

}
