package com.imnotdurnk.domain.calendar.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
public class CalendarStatistic {

    private int lastMonthCount;
    private int thisMonthCount;
    private AlcoholAmount yearTotal;
    private AlcoholAmount monthTotal;

    public CalendarStatistic() {};

    @Builder
    CalendarStatistic(int lastMonthCount, int thisMonthCount, AlcoholAmount yearTotal, AlcoholAmount monthTotal) {
        this.lastMonthCount = lastMonthCount;
        this.thisMonthCount = thisMonthCount;
        this.yearTotal = yearTotal;
        this.monthTotal = monthTotal;
    }

    @Override
    public String toString() {
        return "지난 달 음주: " + lastMonthCount + ", 이번 달 음주: " + thisMonthCount + ", 연간 총" + yearTotal + "병, 월간 총" + monthTotal + "병";
    }
}
