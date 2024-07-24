package com.imnotdurnk.domain.calendar.entity;

import com.imnotdurnk.domain.calendar.dto.CalendarDto;
import com.imnotdurnk.domain.gamelog.entity.GameLogEntity;
import com.imnotdurnk.domain.user.dto.UserDto;
import com.imnotdurnk.domain.user.entity.UserEntity;
import com.imnotdurnk.global.commonClass.BaseEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "calendar")
public class CalendarEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity userEntity;

    @Column(name = "date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime date;

    @Column(name = "title")
    private String title;

    @Column(name = "alcohol_level")
    private Integer alcoholLevel;

    @Column(name = "arrival_time")
    private LocalTime arrivalTime;

    @Column(name = "memo")
    @Lob
    private String memo;

    @Column(name = "beer_amount")
    private Integer beerAmount;

    @Column(name = "soju_amount")
    private Integer sojuAmount;

    @OneToMany(mappedBy = "calendarEntity")
    private List<GameLogEntity> gameLogEntities;

    public CalendarEntity() {}

    @Builder
    public CalendarEntity(UserEntity userEntity,
                          LocalDateTime date,
                          String title,
                          Integer alcoholLevel,
                          LocalTime arrivalTime,
                          String memo,
                          Integer beerAmount,
                          Integer sojuAmount) {
        this.userEntity = userEntity;
        this.date = date;
        this.title = title;
        this.alcoholLevel = alcoholLevel;
        this.arrivalTime = arrivalTime;
        this.memo = memo;
        this.beerAmount = beerAmount;
        this.sojuAmount = sojuAmount;
    }

    public CalendarDto toDto() {
        return CalendarDto.builder()
                .userId(userEntity.getId())
                .date(date)
                .title(title)
                .alcoholLevel(alcoholLevel)
                .arrivalTime(arrivalTime)
                .memo(memo)
                .beerAmount(beerAmount)
                .sojuAmount(sojuAmount)
                .build();
    }


    public void setEntityFromDto(CalendarDto calendarDto){
        this.date = calendarDto.getDate();
        this.arrivalTime = calendarDto.getArrivalTime();
        this.sojuAmount = calendarDto.getSojuAmount();
        this.beerAmount = calendarDto.getBeerAmount();
        this.title = calendarDto.getTitle();
        this.memo = calendarDto.getMemo();
        this.alcoholLevel = calendarDto.getAlcoholLevel();
    }
}
