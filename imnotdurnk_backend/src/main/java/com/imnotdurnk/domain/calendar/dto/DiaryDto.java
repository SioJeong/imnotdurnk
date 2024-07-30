package com.imnotdurnk.domain.calendar.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
public class DiaryDto {

    private int planId;
    private String title;
    private int day;
    private LocalDateTime datetime;
    private int  alcoholLevel;

    public DiaryDto(int planId, int day, LocalDateTime datetime, String title, int alcoholLevel) {
        this.planId = planId;
        this.title = title;
        this.day = day;
        this.datetime = datetime;
        this.alcoholLevel = alcoholLevel;
    }

}
