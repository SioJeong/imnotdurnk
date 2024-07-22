package com.imnotdurnk.domain.calendar.repository;

import com.imnotdurnk.domain.calendar.entity.CalendarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface CalendarRepository extends JpaRepository<CalendarEntity, Integer> {
    List<CalendarEntity> findByUserEntity_IdAndDate(Integer userId, Date date);

}
