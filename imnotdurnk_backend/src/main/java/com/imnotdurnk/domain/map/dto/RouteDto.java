package com.imnotdurnk.domain.map.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
public class RouteDto {
    private Optional<String> stopName;
    private Optional<String> lat;
    private Optional<String> lon;


    public RouteDto(Optional<String> lon, Optional<String> lat, Optional<String> stopName) {
        this.stopName = stopName;
        this.lat = lat;
        this.lon = lon;
    }

    public RouteDto() {
    }
}
