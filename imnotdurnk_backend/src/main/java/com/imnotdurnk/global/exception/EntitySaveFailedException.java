package com.imnotdurnk.global.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/***
 * 저장(insert, update)에 실패한 경우 UNPROCESSABLE_ENTITY(422)를 반환
 * 422: 서버가 요청 엔티티의 컨텐츠 형식을 이해했고 요청 엔티티의 문법도 올바르지만 요청된 지시를 처리할 수 없음을 나타냅니다.
 * https://developer.mozilla.org/ko/docs/Web/HTTP/Status/422
 */
@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
public class EntitySaveFailedException extends RuntimeException {
    private int code = HttpStatus.UNPROCESSABLE_ENTITY.value();

    public EntitySaveFailedException(String message) { super(message); }

    public int getCode() {
        return code;
    }
}