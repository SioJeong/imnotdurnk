package com.imnotdurnk.domain.calendar.repository;

import com.imnotdurnk.domain.calendar.dto.DiaryDto;
import com.imnotdurnk.domain.calendar.repository.mapping.AlcoholAmount;
import com.imnotdurnk.domain.calendar.entity.CalendarEntity;
import com.imnotdurnk.domain.calendar.repository.mapping.PlanForMonth;
import com.imnotdurnk.domain.user.entity.UserEntity;
import org.springframework.data.domain.Limit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CalendarRepository extends JpaRepository<CalendarEntity, Integer> {

    List<CalendarEntity> findByUserEntity_Email(String email);

    @Query("""
            SELECT new com.imnotdurnk.domain.calendar.dto.DiaryDto(c.id, DAY(c.date), c.date, c.title, COALESCE(c.alcoholLevel, 0))
            FROM CalendarEntity c
            WHERE month(c.date) = :month
            AND year(c.date) = :year
            AND c.userEntity.id = :user
            ORDER BY day(c.date) DESC
        """)
    List<DiaryDto> findAllDiary(Integer user, Integer year, Integer month);

    @Query("SELECT c FROM CalendarEntity c WHERE c.userEntity.id = :userId AND DATE(c.date) = :date")
    List<CalendarEntity> findByUserEntity_IdAndDate(Integer userId, LocalDate date);

    @Query("""
        SELECT SUM(sojuAmount) as sojuAmount, SUM(beerAmount) as beerAmount
        FROM CalendarEntity
        WHERE userEntity.id = :userId
        AND FUNCTION('MONTH', date) = :month
        AND FUNCTION('YEAR', date) = :year
        """)
    AlcoholAmount sumAlcoholByMonth(Integer userId, int month, int year);

    @Query("""
        SELECT SUM(sojuAmount) as sojuAmount, SUM(beerAmount) as beerAmount
        FROM CalendarEntity
        WHERE userEntity.id = :userId
        AND FUNCTION('YEAR', date) = :year
        """)
    AlcoholAmount sumAlcoholByYear(Integer userId, int year);

    @Query("""
        SELECT FUNCTION('YEAR', c.date) as year, FUNCTION('MONTH', c.date) as month, COUNT(c.id) as count
        FROM CalendarEntity c
        WHERE c.date BETWEEN :startDate AND :endDate
        GROUP BY FUNCTION('YEAR', c.date), FUNCTION('MONTH', c.date)
        ORDER BY FUNCTION('YEAR', c.date) DESC, FUNCTION('MONTH', c.date) DESC
        """)
    List<PlanForMonth> findRecent12MonthsPlanCount(LocalDateTime startDate, LocalDateTime endDate);

    @Query("SELECT c FROM CalendarEntity c WHERE c.userEntity = :user AND c.date <= :datetime ORDER BY c.date DESC")
    CalendarEntity findByUserIdAndDateTime(UserEntity user, LocalDateTime datetime, Limit limit);

}
