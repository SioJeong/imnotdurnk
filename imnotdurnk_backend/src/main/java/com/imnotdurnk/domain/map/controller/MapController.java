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

    @Operation(
            summary = "대중교통 경로 조회",
            description = "현재 시간에 환승없이 도달 가능한 도착지와 가장 가까운 대중교통 경로를 조회합니다."
    )
    @GetMapping
    public ResponseEntity<ListResponse<?>> getSimplePath(
            @RequestParam(required = true) double startlat, @RequestParam(required = true) double startlon,
            @RequestParam(required = true) double destlat, @RequestParam(required = true) double destlon,
            @RequestParam(required = true) String time) {
        ListResponse<MapDto> response = new ListResponse<>();
        List<MapDto> result = mapService.getStopsAndRoutesInArea(destlat, destlon, startlat, startlon, time);
        response.setDataList(result);
        response.setMessage("결과 반환 성공");
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "대중교통 경로 조회",
            description = "현재 시간에 환승없이 도달 가능한 도착지와 가장 가까운 대중교통 경로를 조회합니다."
    )
    @GetMapping("/detail")
    public ResponseEntity<ListResponse<?>> getPath(
                                                     @RequestParam(required = true) double startlat, @RequestParam(required = true) double startlon,
                                                     @RequestParam(required = true) double destlat, @RequestParam(required = true) double destlon,
                                                    @RequestParam(required = true) String time){
        ListResponse<MapDto> response = new ListResponse<>();
        List<MapDto> result = mapService.getStopsAndRoutesInAreaWithTaxi(destlat,destlon,startlat, startlon, time);
        response.setDataList(result);
        response.setMessage("결과 반환 성공");
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary ="노선 조회",
            description = "route_id와 sequence 를 받아 경로에서의 노선을 반환합니다."
    )
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

