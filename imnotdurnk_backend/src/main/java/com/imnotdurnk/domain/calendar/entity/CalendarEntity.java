package com.imnotdurnk.domain.calendar.entity;

import com.imnotdurnk.domain.gamelog.entity.GameLogEntity;
import com.imnotdurnk.domain.user.entity.UserEntity;
import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "calendar")
public class CalendarEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity userEntity;

    @Column(name = "date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date date;

    @Column(name = "time")
    private String time;

    @Column(name = "title")
    private String title;

    @Column(name = "alcohol_level")
    private String alcoholLevel;

    @Column(name = "arrival_time")
    private String arrivalTime;

    @Column(name = "memo")
    private String memo;

    @Column(name = "beer_amount")
    private String beerAmount;

    @Column(name = "soju_amount")
    private String sojuAmount;

    @OneToMany(mappedBy = "calendarEntity")
    private List<GameLogEntity> gameLogEntities;

}
