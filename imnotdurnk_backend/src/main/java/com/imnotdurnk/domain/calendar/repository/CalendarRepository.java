package com.imnotdurnk.domain.calendar.repository;

import com.imnotdurnk.domain.calendar.dto.AlcoholAmount;
import com.imnotdurnk.domain.calendar.entity.CalendarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface CalendarRepository extends JpaRepository<CalendarEntity, Integer> {

    List<CalendarEntity> findByUserEntity_IdAndDate(Integer userId, Date date);

    @Query("""
        SELECT COUNT(date)
        FROM CalendarEntity
        WHERE userEntity.id = :userId
        AND FUNCTION('MONTH', date) = :month
        AND FUNCTION('YEAR', date) = :year
        """)
    int countByMonth(Integer userId, int month, int year);

    @Query("""
        SELECT SUM(sojuAmount)
        FROM CalendarEntity
        WHERE userEntity.id = :userId
        AND FUNCTION('MONTH', date) = :month
        AND FUNCTION('YEAR', date) = :year
        """)
    double sumSojuByMonth(Integer userId, int month, int year);

    @Query("""
        SELECT SUM(beerAmount)
        FROM CalendarEntity
        WHERE userEntity.id = :userId
        AND FUNCTION('MONTH', date) = :month
        AND FUNCTION('YEAR', date) = :year
        """)
    double sumBeerByMonth(Integer userId, int month, int year);

    @Query("""
        SELECT SUM(sojuAmount)
        FROM CalendarEntity
        WHERE userEntity.id = :userId
        AND FUNCTION('YEAR', date) = :year
        """)
    double sumSojuByYear(Integer userId, int year);

    @Query("""
        SELECT SUM(beerAmount)
        FROM CalendarEntity
        WHERE userEntity.id = :userId
        AND FUNCTION('YEAR', date) = :year
        """)
    double sumBeerByYear(Integer userId, int year);

    @Query("""
        SELECT SUM(sojuAmount), SUM(beerAmount)
        FROM CalendarEntity
        WHERE userEntity.id = :userId
        AND FUNCTION('MONTH', date) = :month
        AND FUNCTION('YEAR', date) = :year
        """)
    AlcoholAmount sumAlcoholByMonth(Integer userId, int month, int year);

    @Query("""
        SELECT SUM(sojuAmount), SUM(beerAmount)
        FROM CalendarEntity
        WHERE userEntity.id = :userId
        AND FUNCTION('YEAR', date) = :year
        """)
    AlcoholAmount sumAlcoholByYear(Integer userId, int year);
}
