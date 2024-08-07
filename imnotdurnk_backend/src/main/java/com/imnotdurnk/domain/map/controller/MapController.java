package com.imnotdurnk.domain.map.controller;

import com.imnotdurnk.domain.calendar.dto.DiaryDto;
import com.imnotdurnk.domain.map.dto.MapDto;
import com.imnotdurnk.domain.map.entity.MapResult;
import com.imnotdurnk.domain.map.service.MapService;
import com.imnotdurnk.global.commonClass.CommonResponse;
import com.imnotdurnk.global.response.ListResponse;
import com.imnotdurnk.global.response.SingleResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/map")
@AllArgsConstructor
public class MapController {

    private MapService mapService;

    @Operation(
            summary = ""
    )
    @GetMapping
    public ResponseEntity<SingleResponse<?>> getPath(@RequestAttribute(value = "AccessToken", required = true) String token,
                                                     @RequestParam(required = true) double startlat, @RequestParam(required = true) double startlon,
                                                     @RequestParam(required = true) double destlat, @RequestParam(required = true) double destlon){
        SingleResponse<MapDto> response = new SingleResponse<>();
        MapResult result = mapService.getStopsAndRoutesInArea(destlat,destlon,startlat, startlon);
        MapDto res = new MapDto(result.getDistance(),result.getStop_lat(),result.getStop_lon(),result.getStop_name(), result.getStop_id());
        response.setData(res);
        response.setMessage("결과 반환 성공");
        return ResponseEntity.ok(response);
    }

}
