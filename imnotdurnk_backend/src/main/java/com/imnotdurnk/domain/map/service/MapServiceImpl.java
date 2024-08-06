package com.imnotdurnk.domain.map.service;

import com.imnotdurnk.domain.map.dto.MapDto;
import com.imnotdurnk.domain.map.entity.MapResult;
import com.imnotdurnk.domain.map.entity.StopEntity;
import com.imnotdurnk.domain.map.repository.StopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MapServiceImpl implements MapService {

    @Autowired
    StopRepository stopRepository;

    /**
     * 지정된 지역 내에서 가장 가까운 정류소와 경로 정보를 검색
     *
     * 주어진 위도 및 경도 범위 내에서 가장 가까운 정류소를 찾기 위해
     * 최소 및 최대 위도 및 경도 값을 계산한 다음, 해당 범위 내의 정류소를 검색하고
     * 가장 가까운 정류소를 반환
     *
     * @param destLat 목적지의 위도
     * @param destLon 목적지의 경도
     * @param latitude 현재 위치의 위도
     * @param longitude 현재 위치의 경도
     * @return 가장 가까운 정류소와 경로 정보를 포함하는 MapResult 객체
     */
    @Override
    public MapResult getStopsAndRoutesInArea(double destLat, double destLon,  double latitude, double longitude) {
        double latMin = latitude - 0.0045;
        double latMax = latitude + 0.0045;
        double lonMin = longitude - 0.0053;
        double lonMax = longitude + 0.0053;
        List<MapResult> stop = stopRepository.findNearestStop(destLat, destLon, latMin, latMax, lonMin, lonMax);
        return stop.getFirst();
    }
}
