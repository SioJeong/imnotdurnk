package com.imnotdurnk.domain.calendar.service;

import com.imnotdurnk.domain.auth.enums.TokenType;
import com.imnotdurnk.domain.calendar.dto.CalendarDto;
import com.imnotdurnk.domain.calendar.dto.CalendarStatistic;
import com.imnotdurnk.domain.calendar.dto.PlanDetailDto;
import com.imnotdurnk.domain.calendar.entity.CalendarEntity;
import com.imnotdurnk.domain.calendar.repository.CalendarRepository;
import com.imnotdurnk.domain.gamelog.repository.GameLogRepository;
import com.imnotdurnk.domain.user.entity.UserEntity;
import com.imnotdurnk.domain.user.repository.UserRepository;
import com.imnotdurnk.global.exception.EntitySaveFailedException;
import com.imnotdurnk.global.exception.ResourceNotFoundException;
import com.imnotdurnk.global.util.JwtUtil;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CalendarServiceImpl implements CalendarService {

    private JwtUtil jwtUtil;
    private CalendarRepository calendarRepository;
    private UserRepository userRepository;
    private GameLogRepository gameLogRepository;

    /***
     * 음주 일정 등록하기 API
     * @param calendarDto
     * @param accessToken
     */
    @Override
    public void updateFeedback(String accessToken, String date, int planId, CalendarDto calendarDto) throws BadRequestException, ResourceNotFoundException{

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

        updatedCalendarEntity = calendarRepository.save(updatedCalendarEntity);

        if(updatedCalendarEntity == null) throw new EntitySaveFailedException("피드백 등록에 실패하였습니다.");

    }

    /**
     * 일정 등록
     *
     * @param token      사용자의 액세스 토큰
     * @param calendarDto   추가할 캘린더의 정보가 담긴 DTO 객체
     * @return          캘린더 저장 성공 시 true, 실패 시 false를 반환
     *
     * @throws Exception 데이터베이스 저장 과정에서 발생할 수 있는 예외
     */
    @Override
    public void addCalendar(String token, CalendarDto calendarDto) throws EntitySaveFailedException {

        CalendarEntity calendar = calendarDto.toEntity();
        calendar.setUserEntity(userRepository.findByEmail(jwtUtil.getUserEmail(token, TokenType.ACCESS)));
        calendar = calendarRepository.save(calendar);

        if(calendar == null) throw new EntitySaveFailedException("저장에 실패하였습니다.");

    }

    /**
     * 특정 날짜에 사용자가 생성한 캘린더 목록을 조회
     *
     * @param date      조회할 캘린더의 날짜
     * @param token     사용자의 액세스 토큰
     * @return         지정된 날짜에 해당하는 사용자의 캘린더 목록을 담고 있는 CalendarDto 리스트
     *
     * @throws Exception 사용자의 이메일을 찾거나 캘린더를 조회하는 과정에서 발생할 수 있는 예외
     */
    @Override
    public List<CalendarDto> getCalendar(Date date, String token){
        UserEntity user = userRepository.findByEmail(jwtUtil.getUserEmail(token, TokenType.ACCESS));
        List<CalendarEntity> calendarEntities = calendarRepository.findByUserEntity_IdAndDate(user.getId(), date);
        return calendarEntities.stream().map(CalendarEntity::toDto).collect(Collectors.toList());
    }

    @Override
    public CalendarStatistic getCalendarStatistic(LocalDate date, String token) {
        UserEntity user = userRepository.findByEmail(jwtUtil.getUserEmail(token, TokenType.ACCESS));

        return CalendarStatistic.builder()
                .lastMonthCount(calendarRepository.countByMonth(user.getId(), date.getMonthValue()-1, date.getYear()))
                .thisMonthCount(calendarRepository.countByMonth(user.getId(), date.getMonthValue(), date.getYear()))
                .yearTotal(calendarRepository.sumAlcoholByYear(user.getId(), date.getMonthValue()))
                .monthTotal(calendarRepository.sumAlcoholByMonth(user.getId(), date.getMonthValue(), date.getYear()))
                .build();
    }

    /***
     * 도착시간을 등록/수정
     *
     * @param accessToken
     * @param planId
     * @param arrivalTime
     *
     * @throws BadRequestException 요청하는 사용자와 요청받은 일정을 등록한 사용자가 일치하지 않는 경우
     * @throws ResourceNotFoundException 일정이 존재하지 않는 경우
     * @throws EntitySaveFailedException DB에 저장(update)이 되지 않음
     */
    @Override
    public void updateArrivalTime(String accessToken, int planId, String arrivalTime) throws BadRequestException, ResourceNotFoundException, EntitySaveFailedException {

        //accessToken에 저장된 사용자 정보와 도착 시간을 수정하려는 일정의 사용자가 일치하는지 확인
        String tokenEmail = jwtUtil.getUserEmail(accessToken, TokenType.ACCESS);
        Optional<CalendarEntity> calendarEntity = calendarRepository.findById(planId);

        //존재하지 않는 일정인 경우
        if(!calendarEntity.isPresent()) throw new ResourceNotFoundException("존재하지 않는 일정입니다.");

        CalendarEntity updatedCalendarEntity = calendarEntity.get();

        //조회 요청한 일정을 등록한 사람의 이메일을 가져옴
        String userIdFromPlan = updatedCalendarEntity.getUserEntity().getEmail();

        //accessToken에 저장된 사용자 이메일과 조회 요청한 일정을 등록한 사용자의 이메일이 일치하지 않는 경우
        if(!tokenEmail.equals(userIdFromPlan)) throw new BadRequestException("잘못된 접근입니다.");

        // String to LocalTime
        DateTimeFormatter format = DateTimeFormatter.ofPattern("HH:mm:ss");
        LocalTime updatedTime = LocalTime.parse(arrivalTime, format);

        // 저장
        updatedCalendarEntity.setArrivalTime(updatedTime);

        //DB에 피드백 기록
        updatedCalendarEntity = calendarRepository.save(updatedCalendarEntity);

        //피드백이 기록되지 않은 경우 예외처리
        if(updatedCalendarEntity == null) throw new EntitySaveFailedException("도착 시간 저장에 실패하였습니다");

    }

    /***
     * planId를 통해 상세 일정을 가져옴
     * @param accessToken
     * @param planId
     * @return 상세 일정 CalendarDto 객체
     * @throws ResourceNotFoundException 존재하지 않는 일정인 경우
     * @throws BadRequestException 조회를 요청한 사용자와 일정을 등록한 사용자가 다른 경우
     */
    @Override
    public PlanDetailDto getPlanDetail(String accessToken, int planId) throws ResourceNotFoundException, BadRequestException{
        // planId를 통해 엔티티를 가져옴
        CalendarEntity calendarEntity = isSameUserAndGetCalendarEntity(accessToken, planId);

        // 게임 로그 조회
        calendarEntity.setGameLogEntities(gameLogRepository.findByCalendarEntity_Id(planId).get());

        return PlanDetailDto.builder()
                .memo(calendarEntity.getMemo())
                .title(calendarEntity.getTitle())
                .sojuAmount(calendarEntity.getSojuAmount())
                .beerAmount(calendarEntity.getBeerAmount())
                .userId(calendarEntity.getId())
                .alcoholLevel(calendarEntity.getAlcoholLevel())
                .gameLogEntities(calendarEntity.getGameLogEntities())
                .date(calendarEntity.getDate())
                .build();
    }


    @Override
    public CalendarEntity isSameUserAndGetCalendarEntity (String accessToken, int planId) throws ResourceNotFoundException, BadRequestException{
        //accessToken에 저장된 사용자 정보와 도착 시간을 수정하려는 일정의 사용자가 일치하는지 확인
        String tokenEmail = jwtUtil.getUserEmail(accessToken, TokenType.ACCESS);
        Optional<CalendarEntity> calendarEntity = calendarRepository.findById(planId);

        //존재하지 않는 일정인 경우
        if(!calendarEntity.isPresent()) throw new ResourceNotFoundException("존재하지 않는 일정입니다.");

        //조회 요청한 일정을 등록한 사람의 이메일을 가져옴
        String userIdFromPlan = calendarEntity.get().getUserEntity().getEmail();

        //accessToken에 저장된 사용자 이메일과 조회 요청한 일정을 등록한 사용자의 이메일이 일치하지 않는 경우
        if(!tokenEmail.equals(userIdFromPlan)) throw new BadRequestException("잘못된 접근입니다.");

        return calendarEntity.get();
    }
}
