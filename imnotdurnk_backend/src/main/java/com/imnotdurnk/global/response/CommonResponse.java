/**
 * 반환 데이터가 없는 기본 Response Object
 */
package com.imnotdurnk.global.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@NoArgsConstructor
@Getter
@Setter
public class CommonResponse {

    int statusCode;
    String message;


    public CommonResponse(int statusCode, String message) {
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
