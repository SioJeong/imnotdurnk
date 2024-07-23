package com.imnotdurnk.domain.user.service;

import com.imnotdurnk.domain.auth.dto.AuthDto;
import com.imnotdurnk.domain.user.dto.UserDto;
import jakarta.mail.MessagingException;
import org.apache.coyote.BadRequestException;
import java.io.UnsupportedEncodingException;

public interface UserService {

    void signUp(UserDto userDto) throws BadRequestException;

    boolean existsByEmail(String email) throws BadRequestException;

    void sendVerificationCode(String email) throws MessagingException, UnsupportedEncodingException, BadRequestException;

    void sendMail(String email, String title, String code, String codeName) throws MessagingException, UnsupportedEncodingException;

    boolean verifyCode(String email, String verificationCode) throws BadRequestException;

    AuthDto login(String email, String password) throws BadRequestException;

    void sendTemporaryPassword(String email) throws MessagingException, UnsupportedEncodingException, BadRequestException;

    void updateProfile(String token, UserDto userDto) throws BadRequestException;

    void logout(String accessToken, String refreshToken) throws BadRequestException;

    boolean checkEmail(String email);

    boolean checkName(String name);

    boolean checkpassword(String password);

    boolean checkphone(String phone);


}
