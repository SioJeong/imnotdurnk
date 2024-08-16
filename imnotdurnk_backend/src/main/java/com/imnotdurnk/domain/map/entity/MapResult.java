package com.imnotdurnk.domain.map.entity;

import java.util.Optional;

public interface MapResult {
    Optional<String> getDestLat();
    Optional<String> getDestLon();
    Optional<String> getStartStop();
    Optional<Double> getStartDistance();
    Optional<String> getRoute();
    Optional<String> getDestStop();
    Optional<Double> getDistance();
    Optional<Double> getDuration();
    Optional<Integer> getSeq1();
    Optional<Integer> getSeq2();
    Optional<String> getRouteId();
    Optional<String> getStartLat();
    Optional<String> getStartLon();
    Optional<Integer> getType();


}
