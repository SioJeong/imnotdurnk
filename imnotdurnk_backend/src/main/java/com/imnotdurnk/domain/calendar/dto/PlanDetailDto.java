package com.imnotdurnk.domain.calendar.dto;

import com.imnotdurnk.domain.calendar.entity.CalendarEntity;
import com.imnotdurnk.domain.gamelog.entity.GameLogEntity;
import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;


@Getter
@Setter
public class PlanDetailDto {

    private Integer id;

    private Integer userId;

    private LocalDateTime date;

    private String title;

    private Integer alcoholLevel;

    private LocalTime arrivalTime;

    private String memo;

    private Integer beerAmount;

    private Integer sojuAmount;

    private List<GameLogEntity> gameLogEntities;

    @Builder
    public PlanDetailDto(Integer id,
                         Integer userId,
                         LocalDateTime date,
                         String title,
                         Integer alcoholLevel,
                         LocalTime arrivalTime,
                         String memo,
                         Integer beerAmount,
                         Integer sojuAmount,
                         List<GameLogEntity> gameLogEntities) {
        this.id = id;
        this.userId = userId;
        this.date = date;
        this.title = title;
        this.alcoholLevel = alcoholLevel;
        this.arrivalTime = arrivalTime;
        this.memo = memo;
        this.beerAmount = beerAmount;
        this.sojuAmount = sojuAmount;
        this.gameLogEntities = gameLogEntities;
    }
}

