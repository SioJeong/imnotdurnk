package com.imnotdurnk.domain.map.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MapDto {

    private String stopId;
    private String stopName;
    private String stopLat;
    private String stopLon;
    private double distance;

    public MapDto(double distance, String stopLon, String stopLat, String stopName, String stopId) {
        this.distance = distance;
        this.stopLon = stopLon;
        this.stopLat = stopLat;
        this.stopName = stopName;
        this.stopId = stopId;
    }

    public MapDto() {
    }
}
