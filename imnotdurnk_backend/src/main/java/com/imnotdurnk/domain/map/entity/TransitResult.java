package com.imnotdurnk.domain.map.entity;

public interface TransitResult {
    String getRoute();
    String getStart();
    String getEnd();
    Integer getDuration();
    Integer getSeq1();
    Integer getSeq2();
    Integer getType();
    String getRouteId();
}
