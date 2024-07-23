package com.imnotdurnk.domain.calendar.controller;

import com.imnotdurnk.domain.calendar.dto.CalendarDto;
import com.imnotdurnk.domain.calendar.dto.CalendarStatistic;
import com.imnotdurnk.domain.calendar.dto.PlanDetailDto;
import com.imnotdurnk.domain.calendar.entity.CalendarEntity;
import com.imnotdurnk.domain.calendar.service.CalendarService;
import com.imnotdurnk.global.exception.EntitySaveFailedException;
import com.imnotdurnk.global.exception.ResourceNotFoundException;
import com.imnotdurnk.global.response.CommonResponse;
import com.imnotdurnk.global.response.ListResponse;
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
import java.util.List;

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

        //응답 객체
        CommonResponse response = new CommonResponse();

        //피드백 등록
        calendarService.updateFeedback(accessToken, date, planId, calendarDto);

        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("피드백 등록이 완료되었습니다.");


        //수정이 완료된 경우
        return ResponseEntity.status(response.getHttpStatus()).body(response);
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
    public ResponseEntity<?> addCalendar(@RequestAttribute(value = "AccessToken", required = true) String token, @RequestBody CalendarDto calendarDto) throws BadRequestException{

        CommonResponse response = new CommonResponse();

        calendarService.addCalendar(token, calendarDto);

        response.setStatusCode(HttpStatus.CREATED.value());
        response.setMessage("일정 등록이 완료되었습니다.");


        return ResponseEntity.status(response.getHttpStatus()).body(response);

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
    public ResponseEntity<?> getCalendar(@RequestAttribute(value = "AccessToken", required = true) String token,
                                         @PathVariable("date") String dateStr) throws ParseException{

        //응답 객체(리스트)
        ListResponse<CalendarDto> response = new ListResponse<>();
        Date date;

        date = new SimpleDateFormat("yyyy-MM-dd").parse(dateStr);
        List<CalendarDto> plans = calendarService.getCalendar(date, token);

        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("일정 조회에 성공하였습니다.");
        response.setDataList(plans);

        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

    /**
     *
     * @param token
     * @param date
     * @return
     */
    @GetMapping("/statistics")
    public ResponseEntity<?> getStatistics(@RequestAttribute(value = "AccessToken", required = true) String token,
                                           @RequestParam(required = true) LocalDate date) {

        // 응답 객체
        SingleResponse<CalendarStatistic> response = new SingleResponse<>();

        CalendarStatistic calendarStatistic = calendarService.getCalendarStatistic(date, token);

        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("일정 조회에 성공하였습니다.");
        response.setData(calendarStatistic);

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
                                               @RequestParam(value = "arrival-time", required = true) String arrivalTime) throws BadRequestException {


        calendarService.updateArrivalTime(accessToken, planId, arrivalTime);
        
        //응답 객체
        CommonResponse response = new CommonResponse();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("도착 시간이 등록되었습니다.");

        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

    /**
     * 상세일정 조회 API
     * @param accessToken
     * @param planId
     * @throws BadRequestException
     */
    @GetMapping("/{date}/plans/{planId}")
    public ResponseEntity<?> getPlanDetail(@RequestAttribute(value = "AccessToken", required = true) String accessToken,
                                           @PathVariable int planId) throws BadRequestException {

        // 일정 조회
        PlanDetailDto planDetailDto = calendarService.getPlanDetail(accessToken, planId);

        SingleResponse<PlanDetailDto> response = new SingleResponse();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("일정 조회에 성공하였습니다.");
        response.setData(planDetailDto);

        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

}
