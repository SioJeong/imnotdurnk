package com.imnotdurnk.domain.map.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;


@Getter
@Setter
@Entity
@Table(name = "stops")
public class StopEntity {

    @Id
    @Column(name = "stop_id")
    private String stopId;

    @Column(name = "stop_name")
    private String stopName;

    @Column(name = "stop_lat")
    private String stopLat;

    @Column(name = "stop_lon")
    private String stopLon;

    @OneToMany(mappedBy = "stop", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<StopTimeEntity> stopTimes;

    public StopEntity() {
    }

    public StopEntity(String stopId, String stopName, String stopLat, String stopLon) {}
}
