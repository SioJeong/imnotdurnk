package com.imnotdurnk.global.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/***
 * 이메일 인증되지 않은 사용자인 경우 401 반환
 */
@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UserNotVerifiedException extends RuntimeException{
    int code = HttpStatus.UNAUTHORIZED.value();

    public UserNotVerifiedException(String message) {
        super(message);
    }

    public int getCode() {
        return code;
    }
}
