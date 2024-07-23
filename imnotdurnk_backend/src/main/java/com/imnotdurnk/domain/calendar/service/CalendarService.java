package com.imnotdurnk.domain.calendar.service;

import com.imnotdurnk.domain.calendar.dto.CalendarDto;
import com.imnotdurnk.domain.calendar.dto.CalendarStatistic;
import com.imnotdurnk.domain.calendar.entity.CalendarEntity;
import com.imnotdurnk.global.exception.EntitySaveFailedException;
import com.imnotdurnk.global.exception.ResourceNotFoundException;
import org.apache.coyote.BadRequestException;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface CalendarService {

    void updateFeedback(String accessToken, String date, int planId, CalendarDto calendarDto) throws BadRequestException, ResourceNotFoundException, EntitySaveFailedException;

    void addCalendar(String token, CalendarDto calendarDto) throws EntitySaveFailedException;

    List<CalendarDto> getCalendar(Date date, String token);

    CalendarStatistic getCalendarStatistic(LocalDate date, String token);

    void updateArrivalTime(String accessToken, int planId, String arrivalTime) throws BadRequestException, ResourceNotFoundException, EntitySaveFailedException;


}
