package com.imnotdurnk.domain.map.controller;

import com.imnotdurnk.domain.calendar.dto.DiaryDto;
import com.imnotdurnk.domain.map.dto.MapDto;
import com.imnotdurnk.domain.map.dto.RouteDto;
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

    @GetMapping
    public ResponseEntity<ListResponse<?>> getPath(
                                                     @RequestParam(required = true) double startlat, @RequestParam(required = true) double startlon,
                                                     @RequestParam(required = true) double destlat, @RequestParam(required = true) double destlon,
                                                    @RequestParam(required = true) String time){
        ListResponse<MapDto> response = new ListResponse<>();
        List<MapDto> result = mapService.getStopsAndRoutesInArea(destlat,destlon,startlat, startlon, time);
        response.setDataList(result);
        response.setMessage("결과 반환 성공");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/route")
    public ResponseEntity<ListResponse<?>> getRoute(
                                                   @RequestParam(required = true) int seq1, @RequestParam(required = true) int seq2,
                                                   @RequestParam(required = true) String routeId){
        ListResponse<RouteDto> response = new ListResponse<>();
        List<RouteDto> result = mapService.getRoutes(routeId,seq1,seq2);
        response.setDataList(result);
        response.setMessage("결과 반환 성공");
        return ResponseEntity.ok(response);
    }

}
