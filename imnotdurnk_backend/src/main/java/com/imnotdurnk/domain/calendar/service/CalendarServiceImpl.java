package com.imnotdurnk.domain.calendar.service;

import com.imnotdurnk.domain.auth.enums.TokenType;
import com.imnotdurnk.domain.calendar.dto.CalendarDto;
import com.imnotdurnk.domain.calendar.entity.CalendarEntity;
import com.imnotdurnk.domain.calendar.repository.CalendarRepository;
import com.imnotdurnk.domain.user.repository.UserRepository;
import com.imnotdurnk.global.exception.ResourceNotFoundException;
import com.imnotdurnk.global.util.JwtUtil;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CalendarServiceImpl implements CalendarService {

    private JwtUtil jwtUtil;
    private CalendarRepository calendarRepository;
    private UserRepository userRepository;

    /***
     * 음주 일정 등록하기 API
     * @param calendarDto
     * @param accessToken
     */
    @Override
    public CalendarEntity feedbackPlan(String accessToken, String date, int planId, CalendarDto calendarDto) throws BadRequestException, ResourceNotFoundException{

        //accessToken과 일정의 사용자가 일치하는지 확인
        String tokenEmail = jwtUtil.getUserEmail(accessToken, TokenType.ACCESS);
        Optional<CalendarEntity> calendarEntity = calendarRepository.findById(planId);

        //존재하지 않는 일정인 경우
        if(!calendarEntity.isPresent()) throw new ResourceNotFoundException("존재하지 않는 일정입니다.");

        CalendarEntity updatedCalendarEntity = calendarEntity.get();

        //조회 요청한 일정을 등록한 사람의 이메일을 가져옴
        String userIdFromPlan = updatedCalendarEntity.getUserEntity().getEmail();

        //accessToken에 저장된 사용자 이메일과 조회 요청한 일정을 등록한 사용자의 이메일이 일치하지 않는 경우
        if(!tokenEmail.equals(userIdFromPlan)) throw new BadRequestException("잘못된 접근입니다.");

        //CalendarEntity updatedCalendarEntity = calendarDto.toEntity(calendarEntity.get().getUserEntity());

        updatedCalendarEntity.setEntityFromDto(calendarDto);

        //DB에 피드백 기록
        return calendarRepository.save(updatedCalendarEntity);

    }
}
