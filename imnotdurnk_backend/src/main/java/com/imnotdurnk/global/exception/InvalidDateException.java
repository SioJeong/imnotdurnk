package com.imnotdurnk.global.exception;

import org.springframework.http.HttpStatus;

/**
 * 입력받은 날짜 정보가 유효하지 않은 형식인 경우 BAD_REQUEST 400을 반환
 * 400: 서버가 클라이언트 오류(예: 잘못된 요청 구문, 유효하지 않은 요청 메시지 프레이밍,
 * 또는 변조된 요청 라우팅) 를 감지해 요청을 처리할 수 없거나, 하지 않는다는 것을 의미합니다.
 */
public class InvalidDateException extends RuntimeException {
    private int code = HttpStatus.BAD_REQUEST.value();

    public InvalidDateException(String message) { super(message); }

    public int getCode() { return code; }
}
