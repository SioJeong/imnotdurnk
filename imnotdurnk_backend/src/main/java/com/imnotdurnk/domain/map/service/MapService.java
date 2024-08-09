package com.imnotdurnk.domain.map.service;

import com.imnotdurnk.domain.map.dto.MapDto;
import com.imnotdurnk.domain.map.dto.RouteDto;
import com.imnotdurnk.domain.map.entity.MapResult;
import com.imnotdurnk.domain.map.entity.StopEntity;

import java.util.List;

public interface MapService {
    public List<MapDto> getStopsAndRoutesInArea(double destLat, double destLon, double latitude, double longitude , String time);

    public List<RouteDto> getRoutes(String routeId, int seq1, int seq2);
}
