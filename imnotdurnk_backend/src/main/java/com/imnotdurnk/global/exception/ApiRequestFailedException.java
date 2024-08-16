package com.imnotdurnk.global.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class ApiRequestFailedException extends RuntimeException {
    private int code = HttpStatus.INTERNAL_SERVER_ERROR.value();

    public ApiRequestFailedException(String message) { super(message); }

    public int getCode() {
        return code;
    }
}