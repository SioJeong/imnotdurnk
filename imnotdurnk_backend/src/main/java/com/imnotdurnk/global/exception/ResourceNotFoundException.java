package com.imnotdurnk.global.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/***
 * 요청받은 리소스가 없는 경우 NOT_FOUND 404를 반환
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    int code = HttpStatus.NOT_FOUND.value();

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public int getCode() {
        return code;
    }
}