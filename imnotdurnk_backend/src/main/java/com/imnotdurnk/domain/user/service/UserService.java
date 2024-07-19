package com.imnotdurnk.domain.user.service;

import com.imnotdurnk.domain.user.dto.UserDto;
import com.imnotdurnk.domain.user.entity.UserEntity;
import jakarta.mail.MessagingException;
import org.springframework.web.bind.annotation.RequestHeader;

import java.io.UnsupportedEncodingException;

public interface UserService {

    UserDto signUp(UserDto userDto);

    boolean existsByEmail(String email);

    boolean sendVerificationCode(String email) throws MessagingException, UnsupportedEncodingException;

    boolean sendMail(String email, String title, String code) throws MessagingException, UnsupportedEncodingException;

    boolean verifyCode(String email, String verificationCode);

    UserDto login(String email, String password);

    boolean sendTemporaryPassword(String email) throws MessagingException, UnsupportedEncodingException;

    boolean updateProfile(String token, UserDto userDto);
}
