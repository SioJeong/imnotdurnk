package com.imnotdurnk.domain.map.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "route")
public class RouteEntity {

    @Id
    @Column(name = "route_id")
    private String routeId;

    @Column(name = "route_short_name")
    private String routeShortName;

    @Column(name = "route_type")
    private Integer routeType;

    @OneToMany(mappedBy = "route", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<StopTimeEntity> stopTimes;

    public RouteEntity() {
    }

    public RouteEntity(String routeShortName, String routeId, Integer routeType) {
        this.routeShortName = routeShortName;
        this.routeId = routeId;
        this.routeType = routeType;
    }
}
