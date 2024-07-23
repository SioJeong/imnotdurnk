/**
 * 응답데이터가 List<T>인 경우 Response Object
 */
package com.imnotdurnk.global.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class ListResponse<T> extends CommonResponse{

    List<T> dataList;


    @Builder
    ListResponse(int statusCode, String message, List<T> dataList){
        super(statusCode, message);
        this.dataList = dataList;
    }
}
