package com.imnotdurnk.domain.calendar.dto;

import com.imnotdurnk.domain.calendar.repository.mapping.AlcoholAmount;
import com.imnotdurnk.domain.calendar.repository.mapping.PlanForMonthImpl;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.List;

@Getter
@Setter
@Component
public class CalendarStatisticDto {

    private List<PlanForMonthImpl> planForMonths;
    private AlcoholAmount yearTotal;
    private AlcoholAmount monthTotal;

    public CalendarStatisticDto() {};

    @Builder
    CalendarStatisticDto(List<PlanForMonthImpl> planForMonths, AlcoholAmount yearTotal, AlcoholAmount monthTotal) {
        this.planForMonths = planForMonths;
        this.yearTotal = yearTotal;
        this.monthTotal = monthTotal;
    }

    @Override
    public String toString() {
        return "월별 음주 횟수: " + planForMonths.toString() + ", 연간 총" + yearTotal + "병, 월간 총" + monthTotal + "병";
    }
}
