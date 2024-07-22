package com.imnotdurnk.domain.calendar.controller;

import com.imnotdurnk.domain.calendar.dto.CalendarDto;
import com.imnotdurnk.domain.calendar.entity.CalendarEntity;
import com.imnotdurnk.domain.calendar.service.CalendarService;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;

@RestController
@RequestMapping("/calendars")
@AllArgsConstructor
public class CalendarController {

    private CalendarService calendarService;


     /***
     * 피드백 등록 API
     * @param accessToken
     * @param date
     * @param planId
     * @param calendarDto
     * @return 수정이 완료된 경우 200, 오류 400 404 500
     * @throws BadRequestException
     */
    @PutMapping("/{date}/plans/{planId}")
    public ResponseEntity<?> feedbackPlan(@RequestAttribute(value = "AccessToken", required = true) String accessToken,
                                          @PathVariable String date,
                                          @PathVariable int planId,
                                          @RequestBody CalendarDto calendarDto) throws BadRequestException {

        //피드백 등록
        CalendarEntity calendarEntity = calendarService.feedbackPlan(accessToken, date, planId, calendarDto);

        //수정이 되지 않은 경우
        if (calendarEntity == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        //수정이 완료된 경우
        else return ResponseEntity.status(HttpStatus.OK).build();
    }
}
