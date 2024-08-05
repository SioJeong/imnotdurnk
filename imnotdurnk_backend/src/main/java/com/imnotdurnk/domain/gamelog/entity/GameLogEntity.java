package com.imnotdurnk.domain.gamelog.entity;

import com.imnotdurnk.domain.calendar.entity.CalendarEntity;
import com.imnotdurnk.domain.gamelog.dto.GameLogDto;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalTime;

@Getter
@Setter
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "game_log")
public class GameLogEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "plan_id", nullable = false)
    private CalendarEntity calendarEntity;

    @Column(name = "game_type")
    private Integer gameType;

    @Column(name = "score")
    private Integer score;

    @CreatedDate
    @Column(name = "time_log")
    @Temporal(TemporalType.TIME)
    private LocalTime timeLog;

    public GameLogEntity() {}

    @Builder
    public GameLogEntity(CalendarEntity calendarEntity, Integer gameType, Integer score, LocalTime timeLog) {
        this.calendarEntity = calendarEntity;
        this.gameType = gameType;
        this.score = score;
        this.timeLog = timeLog;
    }

    /**
     * Entity -> Dto 변환 메서드
     * @return
     */
    public GameLogDto toDto() {
        return GameLogDto.builder()
                .planId(calendarEntity.getId())
                .gameType(gameType)
                .score(score)
                .timeLog(timeLog)
                .build();
    }
}
