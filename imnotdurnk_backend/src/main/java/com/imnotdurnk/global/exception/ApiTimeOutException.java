package com.imnotdurnk.global.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/***
 * 외부 API 호출했을 때 시간 초과가 발생함
 * 408 HyperText Transfer Protocol (HTTP) 408 Request Timeout 응답 상태 코드는 서버가 사용하지 않는 연결을 끊고 싶다는 것을 의미한다.
 * 서버가 클라이언트의 요청 없이도 유휴 상태의 연결에 전송한다.
 * 408은 서버가 계속해서 기다리기보다는 연결을 종료하기로 결정했다는 것을 알려주기 때문에,
 * 서버는 응답에 "close" Connection헤더 필드를 추가해서 전송해야한다.
 */
@ResponseStatus(HttpStatus.REQUEST_TIMEOUT)
public class ApiTimeOutException extends RuntimeException {
    private int code = HttpStatus.REQUEST_TIMEOUT.value();

    public ApiTimeOutException(String message) { super(message); }

    public int getCode() {
        return code;
    }
}