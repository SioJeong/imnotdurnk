package com.imnotdurnk.global.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/***
 * 음성 파일 전처리 중 생기는 IOException으로 더 이상 관련 작업 처리가 어려울 경우 500 반환
 * 500: Internal Server Error 서버 에러 응답 코드는 요청을 처리하는 과정에서 서버가 예상하지 못한 상황에 놓였다는 것을 나타냅니다
 * https://developer.mozilla.org/ko/docs/Web/HTTP/Status/500
 */
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class FailToConvertVoiceFile extends RuntimeException {
    private int code = HttpStatus.INTERNAL_SERVER_ERROR.value();

    public FailToConvertVoiceFile(String message) { super(message); }

    public int getCode() {
        return code;
    }
}