package com.imnotdurnk.domain.user.service;

import com.imnotdurnk.domain.user.dto.UserDto;
import com.imnotdurnk.domain.user.entity.UserEntity;
import jakarta.mail.MessagingException;

import java.io.UnsupportedEncodingException;

public interface UserService {

    UserDto signUp(UserDto userDto);

    boolean existsByEmail(String email);

    boolean sendVerificationCode(String email) throws MessagingException, UnsupportedEncodingException;

    boolean sendMail(String email, String title, String code) throws MessagingException, UnsupportedEncodingException;

    UserDto login(String email, String password);

    boolean sendTemporaryPassword(String email) throws MessagingException, UnsupportedEncodingException;

}
