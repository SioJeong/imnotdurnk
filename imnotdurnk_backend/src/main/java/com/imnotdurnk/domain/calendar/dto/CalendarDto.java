package com.imnotdurnk.domain.calendar.dto;

import com.imnotdurnk.domain.calendar.entity.CalendarEntity;
import com.imnotdurnk.domain.gamelog.entity.GameLogEntity;
import com.imnotdurnk.domain.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.apache.catalina.User;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class CalendarDto {

    private Integer id;

    private Integer planId;

    private Integer userId;

    private String date;

    private String title;

    private Integer alcoholLevel;

    private LocalTime arrivalTime;

    private String memo;

    private Integer beerAmount;

    private Integer sojuAmount;

    public CalendarDto() {}

    @Builder
    public CalendarDto(Integer Id,
                       Integer planId,
                       Integer userId,
                       String date,
                       String title,
                       Integer alcoholLevel,
                       LocalTime arrivalTime,
                       String memo,
                       Integer beerAmount,
                       Integer sojuAmount) {
        this.id = id;
        this.planId = planId;
        this.userId = userId;
        this.date = date;
        this.title = title;
        this.alcoholLevel = alcoholLevel;
        this.arrivalTime = arrivalTime;
        this.memo = memo;
        this.beerAmount = beerAmount;
        this.sojuAmount = sojuAmount;
    }

    public CalendarEntity toEntity() {
        return CalendarEntity.builder()
                .date(LocalDateTime.parse(date))
                .title(title)
                .alcoholLevel(alcoholLevel)
                .arrivalTime(arrivalTime)
                .memo(memo)
                .beerAmount(beerAmount)
                .sojuAmount(sojuAmount)
                .build();
    }
}
