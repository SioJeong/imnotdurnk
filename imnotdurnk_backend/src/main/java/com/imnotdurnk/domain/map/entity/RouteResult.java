package com.imnotdurnk.domain.map.entity;

import java.util.Optional;

public interface RouteResult {
    Optional<String> getStopName();
    Optional<String> getLon();
    Optional<String> getLat();
}
