package com.imnotdurnk.domain.map.service;

import com.imnotdurnk.domain.map.dto.MapDto;
import com.imnotdurnk.domain.map.dto.RouteDto;
import com.imnotdurnk.domain.map.entity.MapResult;
import com.imnotdurnk.domain.map.entity.RouteResult;
import com.imnotdurnk.domain.map.entity.StopEntity;
import com.imnotdurnk.domain.map.repository.StopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
     * @param time 현재 시간
     * @return 가장 가까운 정류소와 경로 정보를 포함하는 MapResult 객체
     */
    @Override
    public List<MapDto> getStopsAndRoutesInArea(double destLat, double destLon,  double latitude, double longitude, String time) {

        double d = 0.005;
        List<MapDto> mapResult = new ArrayList<MapDto>();
        for(int t=1;t<=4;t++){
            double latMin = latitude - d*t;
            double latMax = latitude + d*t;
            double lonMin = longitude - d*t;
            double lonMax = longitude + d*t;
            List<MapResult> stop = stopRepository.findStop(destLat, destLon, latitude, longitude, latMin, latMax, lonMin, lonMax, time);
            if(!stop.getFirst().getRoute().isEmpty()){
                for(MapResult result : stop){
                    String slon = result.getStartLon().get();
                    slon=slon.replace("\r", "");
                    String dlon = result.getDestLon().get();
                    dlon=dlon.replace("\r", "");
                    mapResult.add(new MapDto(result.getDestLat(), Optional.of(dlon),result.getStartStop(),result.getStartDistance(),result.getRoute(),result.getDestStop(),result.getDistance(),result.getDuration(), Optional.of(5 * t), result.getSeq1(), result.getSeq2(), result.getRouteId(), result.getStartLat(), Optional.of(slon)));
                }
                break;
            }

        }
        return mapResult;
    }

    @Override
    public List<RouteDto> getRoutes(String routeId, int seq1, int seq2){
        int min = seq1<=seq2?seq1:seq2;
        int max = seq1>seq2?seq1:seq2;

        List<RouteResult> route = stopRepository.findRoute(min, max, routeId);
        List<RouteDto> routeResult = new ArrayList<>();
        for(RouteResult result : route){
            String lon = result.getLon().get();
            lon=lon.replace("\r", "");
            routeResult.add(new RouteDto(Optional.of(lon),result.getLat(),result.getStopName()));
        }
        return routeResult;
    }
}
