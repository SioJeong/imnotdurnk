package com.imnotdurnk.domain.map.dto;

import lombok.Getter;
import lombok.Setter;

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
    Integer seq1;
    Integer seq2;
    Integer type;
    String routeId;

    public TransitDto(String route, String start, String end, Double slat, Double slon, Double dlat, Double dlon, Integer duration, Integer seq1, Integer seq2, Integer type, String routeId) {
        this.route=route;
        this.start=start;
        this.end=end;
        this.slat=slat;
        this.slon=slon;
        this.dlat=dlat;
        this.dlon=dlon;
        this.duration=duration;
        this.seq1=seq1;
        this.seq2=seq2;
        this.type = type;
        this.routeId=routeId;
    }

    public TransitDto() {}
}
