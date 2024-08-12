package com.imnotdurnk.domain.map.service;

import com.imnotdurnk.domain.map.dto.MapDto;
import com.imnotdurnk.domain.map.dto.RouteDto;
import com.imnotdurnk.domain.map.entity.MapResult;
import com.imnotdurnk.domain.map.entity.StopEntity;

import java.util.List;

public interface MapService {
    public List<MapDto> getStopsAndRoutesInArea(double destlat, double destlon, double startlat, double startlon , String time);

    public List<RouteDto> getRoutes(String routeId, int seq1, int seq2);

    public List<MapDto> getStopsAndRoutesInAreaWithTaxi(double destlat, double destlon, double startlat, double startlon , String time);
}

