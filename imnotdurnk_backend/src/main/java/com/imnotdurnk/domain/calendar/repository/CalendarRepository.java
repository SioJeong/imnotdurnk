package com.imnotdurnk.domain.calendar.repository;

import com.imnotdurnk.domain.calendar.entity.CalendarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CalendarRepository extends JpaRepository<CalendarEntity, Integer> {

}
