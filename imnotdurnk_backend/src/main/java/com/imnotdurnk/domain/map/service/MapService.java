package com.imnotdurnk.domain.map.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.imnotdurnk.domain.map.dto.MapDto;
import com.imnotdurnk.domain.map.dto.RouteDto;
import com.imnotdurnk.domain.map.dto.TransitDto;

import java.util.List;

public interface MapService {
    public List<MapDto> getStopsAndRoutesInArea(double destlat, double destlon, double startlat, double startlon , String time);

    public List<RouteDto> getRoutes(String routeId, int seq1, int seq2);

    public List<MapDto> getStopsAndRoutesInAreaWithTaxi(double destlat, double destlon, double startlat, double startlon , String time);

    JsonNode requestOdsayApi(String depLng, String depLat, String destLng, String destLat);

    List<List<TransitDto>> getOptimizeRoute(double destlat, double destlon, double startlat, double startlon, String time);
}

