package com.imnotdurnk.domain.map.service;

import com.imnotdurnk.domain.map.dto.MapDto;
import com.imnotdurnk.domain.map.entity.MapResult;
import com.imnotdurnk.domain.map.entity.StopEntity;

import java.util.List;

public interface MapService {
    public MapResult getStopsAndRoutesInArea(double destLat, double destLon, double latitude, double longitude );
}
