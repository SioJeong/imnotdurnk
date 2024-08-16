package com.imnotdurnk.domain.user.service;

import com.imnotdurnk.domain.auth.dto.AuthDto;
import com.imnotdurnk.domain.user.dto.LoginUserDto;
import com.imnotdurnk.domain.user.dto.UpdatedPasswordDto;
import com.imnotdurnk.domain.user.dto.UserDto;
import jakarta.mail.MessagingException;
import org.apache.coyote.BadRequestException;
import java.io.UnsupportedEncodingException;

public interface UserService {

    void signUp(UserDto userDto) throws BadRequestException;

    boolean existsByEmail(String email) throws BadRequestException;

    boolean isDeletedUser(String email);

    void sendVerificationCode(String email) throws MessagingException, UnsupportedEncodingException, BadRequestException;

    void sendMail(String email, String title, String code, String codeName) throws MessagingException, UnsupportedEncodingException;

    boolean verifyCode(String email, String verificationCode) throws BadRequestException;

    AuthDto login(LoginUserDto loginUserDto) throws BadRequestException;

    void sendTemporaryPassword(String email) throws MessagingException, UnsupportedEncodingException, BadRequestException;

    void updateProfile(String token, UserDto userDto) throws BadRequestException;

    void logout(String accessToken, String refreshToken) throws BadRequestException;

    void updatePassword(String accessToken, UpdatedPasswordDto updatedPasswordDto) throws BadRequestException;

    void deleteAccount(String refreshToken, String accessToken, String password) throws BadRequestException;
}
