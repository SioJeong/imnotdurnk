package com.imnotdurnk.global.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/***
 * 필수 필드 누락 시 400 반환
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class RequiredFieldMissingException extends RuntimeException {
    int code = HttpStatus.BAD_REQUEST.value();
    public RequiredFieldMissingException(String message) {
        super(message);
    }

    public int getCode() {
        return code;
    }
}
