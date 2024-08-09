package com.imnotdurnk.domain.calendar.repository.mapping;

public class AlcoholAmountImpl implements AlcoholAmount {

    private double sojuAmount;
    private double beerAmount;

    // 생성자, getter, setter 추가
    public AlcoholAmountImpl(double sojuAmount, double beerAmount) {
        this.sojuAmount = sojuAmount;
        this.beerAmount = beerAmount;
    }

    @Override
    public double getSojuAmount() {
        return 0;
    }

    @Override
    public double getBeerAmount() {
        return 0;
    }
}
