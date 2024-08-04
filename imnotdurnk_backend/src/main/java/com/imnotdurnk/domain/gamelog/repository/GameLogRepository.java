package com.imnotdurnk.domain.gamelog.repository;

import com.imnotdurnk.domain.calendar.entity.CalendarEntity;
import com.imnotdurnk.domain.gamelog.entity.GameLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameLogRepository extends JpaRepository<GameLogEntity, Integer> {

    @Query("""
        SELECT COALESCE(AVG(gl.score), 0)
        FROM GameLogEntity gl
        WHERE gl.calendarEntity.id IN (SELECT ce.id FROM CalendarEntity ce WHERE ce.userEntity.id = :userId)
        AND gl.gameType = :gameType
        """)
    double selectTotalAverage(@Param("userId") int userId, @Param("gameType") int gameType);

    @Query("""
        SELECT COALESCE(AVG(gl.score), 0)
        FROM GameLogEntity gl
        JOIN gl.calendarEntity c
        WHERE gl.gameType = :gameType
        AND FUNCTION('MONTH', c.date) = :month
        AND FUNCTION('YEAR', c.date) = :year
        """)
    double selectMonthAverage(@Param("gameType") int gameType,
                              @Param("month") int month,
                              @Param("year") int year);

    @Query("""
        SELECT COUNT(DISTINCT c.date)
        FROM GameLogEntity gl
        JOIN gl.calendarEntity c
        WHERE gl.gameType = :gameType
        AND FUNCTION('MONTH', c.date) = :month
        AND FUNCTION('YEAR', c.date) = :year
        AND CAST(gl.score AS double) < :averageScore
        """)
    int countDaysWithLowScores(@Param("gameType") int gameType,
                               @Param("month") int month,
                               @Param("year") int year,
                               @Param("averageScore") double averageScore);


    Optional<List<GameLogEntity>> findByCalendarEntity_Id(int planId);

    GameLogEntity findById(int id);
}
