package com.imnotdurnk.domain.user.service;

import com.imnotdurnk.domain.auth.dto.AuthDto;
import com.imnotdurnk.domain.user.dto.UserDto;
import jakarta.mail.MessagingException;
import org.springframework.web.bind.annotation.RequestHeader;
import org.apache.coyote.BadRequestException;
import java.io.UnsupportedEncodingException;

public interface UserService {

    boolean signUp(UserDto userDto);

    boolean existsByEmail(String email);

    boolean sendVerificationCode(String email) throws MessagingException, UnsupportedEncodingException;

    boolean sendMail(String email, String title, String code) throws MessagingException, UnsupportedEncodingException;

    boolean verifyCode(String email, String verificationCode);

    AuthDto login(String email, String password) throws BadRequestException;

    boolean sendTemporaryPassword(String email) throws MessagingException, UnsupportedEncodingException;

    boolean updateProfile(String token, UserDto userDto);

    void logout(String accessToken, String refreshToken);

}
