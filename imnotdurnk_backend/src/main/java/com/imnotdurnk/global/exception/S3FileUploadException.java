package com.imnotdurnk.global.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * S3 버킷에 파일 업로드/다운로드가 정상적으로 처리되지 않은 경우 406 반환
 */
@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
public class S3FileUploadException extends RuntimeException {
    int code = HttpStatus.NOT_ACCEPTABLE.value();

    public S3FileUploadException(String message) {
        super(message);
    }
    public int getCode() {
        return code;
    }
}
