package com.imnotdurnk.domain.calendar.service;

import com.imnotdurnk.domain.calendar.dto.CalendarDto;
import com.imnotdurnk.domain.calendar.entity.CalendarEntity;
import com.imnotdurnk.global.exception.ResourceNotFoundException;
import org.apache.coyote.BadRequestException;

import java.util.Date;
import java.util.List;

public interface CalendarService {

    CalendarEntity updateFeedback(String accessToken, String date, int planId, CalendarDto calendarDto) throws BadRequestException, ResourceNotFoundException;

    boolean addCalendar(String token, CalendarDto calendarDto);

    List<CalendarDto> getCalendar(Date date, String token);

}
