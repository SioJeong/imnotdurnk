/**
 * 반환 데이터가 없는 기본 Response Object
 */
package com.imnotdurnk.global.response;

import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@NoArgsConstructor
public class CommonResponse {

    int statusCode;
    String message;


    CommonResponse(int statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
    }

    public HttpStatus getHttpStatus() {
        try {
            return HttpStatus.valueOf(statusCode);
        } catch (IllegalArgumentException e) {
            return HttpStatus.OK;
        }
    }

}
