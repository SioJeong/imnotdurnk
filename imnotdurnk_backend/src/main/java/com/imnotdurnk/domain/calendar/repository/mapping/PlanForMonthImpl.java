package com.imnotdurnk.domain.calendar.repository.mapping;

import lombok.Getter;

@Getter
public class PlanForMonthImpl implements PlanForMonth {

    private int year;
    private int month;
    private int count;

    public PlanForMonthImpl(int monthValue, int year, int count) {
        this.year = year;
        this.month = monthValue;
        this.count = count;
    }

    @Override
    public String toString() {
        return year + "년" + month + "월 : " + count + "회";
    }
}
