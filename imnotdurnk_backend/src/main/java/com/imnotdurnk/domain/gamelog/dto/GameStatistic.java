package com.imnotdurnk.domain.gamelog.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
public class GameStatistic {

    private double totalAverage;
    private double monthAverage;
    private int lowerCountThanMonthAvg;
    private int lowerCountThanYearAvg;

    public GameStatistic() {}

    @Builder
    public GameStatistic(double totalAverage, double monthAverage, int lowerCountThanMonthAvg, int lowerCountThanYearAvg) {
        this.totalAverage = totalAverage;
        this.monthAverage = monthAverage;
        this.lowerCountThanMonthAvg = lowerCountThanMonthAvg;
        this.lowerCountThanYearAvg = lowerCountThanYearAvg;
    }

    @Override
    public String toString() {
        return "전체 평균: " + totalAverage + ", 이번달 평균: " + monthAverage
                + ", 이번달 평균보다 점수가 낮은 일수: " + lowerCountThanMonthAvg + ", 올해 평균보다 점수가 낮은 일수: " + lowerCountThanYearAvg;
    }
}
