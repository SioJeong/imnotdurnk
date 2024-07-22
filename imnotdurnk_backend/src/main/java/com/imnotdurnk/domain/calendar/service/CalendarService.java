package com.imnotdurnk.domain.calendar.service;

import com.imnotdurnk.domain.calendar.dto.CalendarDto;
import com.imnotdurnk.domain.calendar.entity.CalendarEntity;
import com.imnotdurnk.global.exception.ResourceNotFoundException;
import org.apache.coyote.BadRequestException;

public interface CalendarService {
    CalendarEntity feedbackPlan(String accessToken, String date, int planId, CalendarDto calendarDto) throws BadRequestException, ResourceNotFoundException;
}
