package com.imnotdurnk.domain.map.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
public class MapDto {
    private Optional<String> destLat;
    private Optional<String> destLon;
    private Optional<String> startStop;
    private Optional<Double> startDistance;
    private Optional<String> route;
    private Optional<String> destStop;
    private Optional<Double> distance;
    private Optional<Double> duration;
    private Optional<Integer> walkingTime;
    private Optional<Integer> seq1;
    private Optional<Integer> seq2;
    private Optional<String> routeId;
    private Optional<String> startLat;
    private Optional<String> startLon;

    // 생성자
    public MapDto(Optional<String> destLat, Optional<String> destLon,
                  Optional<String> startStop, Optional<Double> startDistance,
                  Optional<String> route, Optional<String> destStop,
                  Optional<Double> distance, Optional<Double> duration, Optional<Integer> walkingTime,
                  Optional<Integer> seq1, Optional<Integer> seq2, Optional<String> routeId,
                  Optional<String> startLat, Optional<String> startLon) {
        this.destLat = destLat;
        this.destLon = destLon;
        this.startStop = startStop;
        this.startDistance = startDistance;
        this.route = route;
        this.destStop = destStop;
        this.distance = distance;
        this.duration = duration;
        this.walkingTime = walkingTime;
        this.seq1 =seq1;
        this.seq2 = seq2;
        this.routeId = routeId;
        this.startLat = startLat;
        this.startLon = startLon;

    }

    public MapDto() {
    }
}
