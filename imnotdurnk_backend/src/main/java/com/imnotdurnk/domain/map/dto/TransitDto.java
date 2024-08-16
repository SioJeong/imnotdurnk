package com.imnotdurnk.domain.map.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TransitDto {
    String route;
    String start;
    String end;
    Double slat;
    Double slon;
    Double dlat;
    Double dlon;
    Integer duration;
    Integer stopCnt;
    Integer type;
    Integer totalWalkTime;
    Integer totalWalk;
    String timestamp;
    List<RouteDto> routeList;

    public TransitDto(String route, String start, String end, Double slat, Double slon, Double dlat, Double dlon, Integer duration, Integer seq1, Integer seq2, Integer type, List<RouteDto> routeList, Integer totalWalk, Integer totalWalkTime, String timestamp) {
        this.route=route;
        this.start=start;
        this.end=end;
        this.slat=slat;
        this.slon=slon;
        this.dlat=dlat;
        this.dlon=dlon;
        this.duration=duration;
        this.type = type;
        this.stopCnt=seq2-seq1;
        this.routeList=routeList;
        this.totalWalkTime=totalWalkTime;
        this.totalWalk=totalWalk;
        this.timestamp=timestamp;
    }

    public TransitDto() {}
}
