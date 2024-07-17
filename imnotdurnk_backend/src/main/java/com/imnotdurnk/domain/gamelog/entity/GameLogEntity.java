package com.imnotdurnk.domain.gamelog.entity;

import com.imnotdurnk.domain.calendar.entity.CalendarEntity;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "game_log")
public class GameLogEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "plan_id", nullable = false)
    private CalendarEntity calendarEntity;

    @Column(name = "game_type")
    private String gameType;

    @Column(name = "score")
    private String score;

    @Column(name = "time_log")
    private String timeLog;

    @OneToMany(mappedBy = "gameLogEntity")
    private List<VoiceEntity> voiceEntities;
}
