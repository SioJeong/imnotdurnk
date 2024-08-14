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

    public TransitDto(String route, String start, String end, Double slat, Double slon, Double dlat, Double dlon) {
        this.route=route;
        this.start=start;
        this.end=end;
        this.slat=slat;
        this.slon=slon;
        this.dlat=dlat;
        this.dlon=dlon;
    }

    public TransitDto() {}
}
