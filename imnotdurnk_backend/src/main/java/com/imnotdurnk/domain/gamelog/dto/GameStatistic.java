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
    private int lowerCount;

    public GameStatistic() {}

    @Builder
    public GameStatistic(double totalAverage, double monthAverage, int lowerCount) {
        this.totalAverage = totalAverage;
        this.monthAverage = monthAverage;
        this.lowerCount = lowerCount;
    }

    @Override
    public String toString() {
        return "전체 평균: " + totalAverage + ", 이번달 평균: " + monthAverage + ", 이번달 평균보다 점수가 낮은 일수" + lowerCount;
    }
}
