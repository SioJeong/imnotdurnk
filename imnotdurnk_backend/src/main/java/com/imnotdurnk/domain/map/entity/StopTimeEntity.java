package com.imnotdurnk.domain.map.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "stop_time")
public class StopTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "stop_id", nullable = false)
    private StopEntity stop;

    @ManyToOne
    @JoinColumn(name = "route_id", nullable = false)
    private RouteEntity route;

    @Column(name = "pickup_type")
    private Integer pickupType;

    @Column(name = "dropoff_type")
    private Integer dropoffType;

    @Column(name = "departure_time")
    private String departureTime;

    @Column(name = "stop_sequence")
    private Integer stopSequence;

    public StopTimeEntity(Integer id, StopEntity stop, RouteEntity route, Integer pickupType, Integer dropoffType, String departureTime, Integer stopSequence) {
        this.id = id;
        this.stop = stop;
        this.route = route;
        this.pickupType = pickupType;
        this.dropoffType = dropoffType;
        this.departureTime = departureTime;
        this.stopSequence = stopSequence;
    }

    public StopTimeEntity() {
    }

}