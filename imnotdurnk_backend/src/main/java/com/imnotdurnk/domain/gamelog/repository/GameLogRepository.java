package com.imnotdurnk.domain.gamelog.repository;

import com.imnotdurnk.domain.gamelog.entity.GameLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GameLogRepository extends JpaRepository<GameLogEntity, Integer> {

    @Query("""
        SELECT AVG(gl.score)
        FROM GameLogEntity gl
        WHERE gl.calendarEntity.id IN (SELECT ce.id FROM CalendarEntity ce WHERE ce.userEntity.id = :userId)
        AND gl.gameType = :gameType
        """)
    double selectTotalAverage(@Param("userId") int userId, @Param("gameType") int gameType);

    @Query("""
        SELECT AVG(gl.score)
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
        AND gl.score < :averageScore
        """)
    int countDaysWithLowScores(@Param("gameType") int gameType,
                               @Param("month") int month,
                               @Param("year") int year,
                               @Param("averageScore") double averageScore);
}
