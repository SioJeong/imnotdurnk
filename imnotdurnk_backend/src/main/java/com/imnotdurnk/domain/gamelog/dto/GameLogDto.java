package com.imnotdurnk.domain.gamelog.dto;

import com.imnotdurnk.domain.calendar.entity.CalendarEntity;
import com.imnotdurnk.domain.gamelog.entity.GameLogEntity;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
public class GameLogDto {

    @NotNull
    private Integer planId;
    private Integer gameType;
    private Integer score;
    private LocalTime timeLog;

    public GameLogDto() {}

    @Builder
    public GameLogDto(Integer planId, Integer gameType, Integer score, LocalTime timeLog) {
        this.planId = planId;
        this.gameType = gameType;
        this.score = score;
        this.timeLog = timeLog;
    }

    /**
     * Dto -> Entity 변환 메서드
     * @param calendarEntity
     * @return
     */
    public GameLogEntity toEntity(CalendarEntity calendarEntity) {
        return GameLogEntity.builder()
                .calendarEntity(calendarEntity)
                .gameType(this.gameType)
                .score(this.score)
                .timeLog(this.timeLog)
                .build();
    }

}
