package com.imnotdurnk.global.response;

import com.imnotdurnk.global.commonClass.CommonResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ListsResponse<T> extends CommonResponse {

    List<List<T>> dataList;


    @Builder
    public ListsResponse(int statusCode, String message, List<List<T>> dataList){
        super(statusCode, message);
        this.dataList = dataList;
    }
}
