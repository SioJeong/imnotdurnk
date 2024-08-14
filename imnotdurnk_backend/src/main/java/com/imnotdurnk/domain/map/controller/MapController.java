package com.imnotdurnk.domain.map.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.imnotdurnk.domain.map.dto.MapDto;
import com.imnotdurnk.domain.map.dto.RouteDto;
import com.imnotdurnk.domain.map.dto.TransitDto;
import com.imnotdurnk.domain.map.service.MapService;
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
    public ResponseEntity<ListResponse<?>> getSimplePath(@RequestParam(required = true) double startlat, @RequestParam(required = true) double startlon,
                                                         @RequestParam(required = true) double destlat, @RequestParam(required = true) double destlon,
                                                         @RequestParam(required = true) String time) {
        ListResponse<MapDto> response = new ListResponse<>();
        List<MapDto> result = mapService.getStopsAndRoutesInArea(startlat, startlon, destlat, destlon, time);
        response.setDataList(result);
        response.setMessage("결과 반환 성공");
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "대중교통 경로 조회",
            description = "현재 시간에 환승없이 도달 가능한 도착지와 가장 가까운 대중교통 경로와 택시비를 조회합니다."
    )
    @GetMapping("/detail")
        public ResponseEntity<ListResponse<?>> getPath(@RequestParam(required = true) double startlat, @RequestParam(required = true) double startlon,
                                                       @RequestParam(required = true) double destlat, @RequestParam(required = true) double destlon,
                                                       @RequestParam(required = true) String time) {
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

    @Operation(
            summary = "Odsay API",
            description = "Odsay API의 대중교통 경로 탐색 결과를 반환합니다."
    )
    @GetMapping("/odsay")
    public ResponseEntity<SingleResponse<?>> requestOdsayApi(@RequestParam(required = true) String depLng, @RequestParam(required = true) String depLat,
                                                             @RequestParam(required = true) String destLng, @RequestParam(required = true) String destLat){
        SingleResponse response = new SingleResponse();
        JsonNode jsonNode = mapService.requestOdsayApi(depLng,depLat,destLng,destLat);
        response.setData(jsonNode);
        response.setMessage("Odsay API 호출 성공");
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "대중교통 경로 조회",
            description = "Odsay API에서 환승 지점을 찾아 경로를 탐색합니다."
    )
    @GetMapping("/odsay/route")
    public ResponseEntity<ListResponse<?>> getOptimizeRoute(@RequestParam(required = true) double startlat, @RequestParam(required = true) double startlon,
                                                            @RequestParam(required = true) double destlat, @RequestParam(required = true) double destlon,
                                                            @RequestParam(required = true) String time){
        ListResponse<TransitDto> response = new ListResponse<>();
        List<TransitDto> result = mapService.getOptimizeRoute(destlat,destlon,startlat,startlon,time);
        response.setDataList(result);
        response.setMessage("대중교통 경로 조회 성공");
        return ResponseEntity.ok(response);
    }

}

