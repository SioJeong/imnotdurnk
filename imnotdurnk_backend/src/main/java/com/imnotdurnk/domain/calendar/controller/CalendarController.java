package com.imnotdurnk.domain.calendar.controller;

import com.imnotdurnk.domain.calendar.dto.CalendarDto;
import com.imnotdurnk.domain.calendar.dto.CalendarStatistic;
import com.imnotdurnk.domain.calendar.entity.CalendarEntity;
import com.imnotdurnk.domain.calendar.service.CalendarService;
import com.imnotdurnk.global.exception.EntitySaveFailedException;
import com.imnotdurnk.global.exception.ResourceNotFoundException;
import com.imnotdurnk.global.response.SingleResponse;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;

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
    public ResponseEntity<?> updateFeedback(@RequestAttribute(value = "AccessToken", required = true) String accessToken,
                                          @PathVariable String date,
                                          @PathVariable int planId,
                                          @RequestBody CalendarDto calendarDto) throws BadRequestException {

        //피드백 등록
        CalendarEntity calendarEntity = calendarService.updateFeedback(accessToken, date, planId, calendarDto);

        //수정이 되지 않은 경우
        if (calendarEntity == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        //수정이 완료된 경우
        else return ResponseEntity.status(HttpStatus.OK).build();
    }


    /**
     * 일정 추가 API
     *
     * @param token 사용자의 액세스 토큰
     * @param calendarDto 추가할 일정의 데이터
     * @return 일정이 성공적으로 등록되면 201 Created 상태 코드 반환
     * @throws BadRequestException 일정 등록 실패
     */
    @PostMapping
    public ResponseEntity<?> addCalendar(@RequestAttribute(value = "AccessToken", required = false) String token, @RequestBody CalendarDto calendarDto) throws BadRequestException{
        if(calendarService.addCalendar(token, calendarDto)){
            return new ResponseEntity<>(HttpStatus.CREATED);
        }else{
            throw new BadRequestException("일정 등록 실패");
        }
    }

    /**
     * 특정 날짜의 일정 조회 API
     *
     * @param token 사용자의 액세스 토큰
     * @param dateStr 조회할 날짜. "yyyy-MM-dd" 형식의 문자열
     * @return 조회 성공 시 200 OK 상태 코드와 함께 해당 날짜의 일정 목록 반환
     * @throws ParseException 날짜 문자열을 파싱하는 과정에서 발생할 수 있는 예외
     */
    @GetMapping("/{date}/plans")
    public ResponseEntity<?> getCalendar(@RequestAttribute(value = "AccessToken", required = false) String token, @PathVariable("date") String dateStr) {
        Date date;
        try {
            date = new SimpleDateFormat("yyyy-MM-dd").parse(dateStr);
        } catch (ParseException e) {
            return ResponseEntity.badRequest().body("잘못된 날짜 형식"); // 오류 처리
        }
        return ResponseEntity.status(HttpStatus.OK).body(calendarService.getCalendar(date, token));
    }

    /**
     *
     * @param token
     * @param date
     * @return
     */
    @GetMapping("/statistics")
    public ResponseEntity<?> getStatistics(@RequestAttribute(value = "AccessToken", required = false) String token,
                                           @RequestParam LocalDate date) {
        if (date != null) {
            return ResponseEntity.badRequest().body("잘못된 날짜 형식"); // 오류 처리
        }
        // Null 값 예외처리 필요(db에 값이 없을 때)
        CalendarStatistic calendarStatistic = calendarService.getCalendarStatistic(date, token);
        return ResponseEntity.status(HttpStatus.OK).body(calendarStatistic);
    }

    /***
     * 도착시간 등록/수정 API
     *
     * @param accessToken
     * @param planId
     * @param arrivalTime
     *
     * @return
     */
    @GetMapping("/{planId}")
    public ResponseEntity<?> updateArrivalTime(@RequestAttribute(value = "AccessToken", required = true) String accessToken,
                                               @PathVariable int planId,
                                               @RequestParam(value = "arrival-time", required = true) String arrivalTime){

        try {

            calendarService.updateArrivalTime(accessToken, planId, arrivalTime);

        } catch (ResourceNotFoundException resourceNotFoundException){
            //NOT_FOUND 404
            ResponseEntity.status(resourceNotFoundException.getStatus()).body(resourceNotFoundException.getMessage());
        } catch (BadRequestException badRequestException){
            //BAD_REQUEST 400
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(badRequestException.getMessage());

        } catch (EntitySaveFailedException entitySaveFailedException){
            //UNPROCESSABLE_ENTITY 422
            return ResponseEntity.status(entitySaveFailedException.getStatus()).body(entitySaveFailedException.getMessage());
        }

        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
