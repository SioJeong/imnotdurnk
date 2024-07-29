package com.imnotdurnk.domain.calendar.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DiaryDto {

    private int planId;
    private String title;
    private int day;
    private int  alcoholLevel;

    public DiaryDto(int planId, int day, String title, int alcoholLevel) {
        this.planId = planId;
        this.title = title;
        this.day = day;
        this.alcoholLevel = alcoholLevel;
    }

}
