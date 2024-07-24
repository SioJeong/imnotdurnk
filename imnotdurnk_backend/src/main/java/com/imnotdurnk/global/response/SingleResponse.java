/**
 * 응답데이터가 단일 객체인 경우 Response Object
 */
package com.imnotdurnk.global.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SingleResponse<T> extends CommonResponse{

    T data;


    @Builder
    public SingleResponse(int statusCode, String message, T data) {
        super(statusCode, message);
        this.data = data;
    }
}
