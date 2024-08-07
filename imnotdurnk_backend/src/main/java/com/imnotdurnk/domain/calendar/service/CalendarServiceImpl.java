package com.imnotdurnk.domain.calendar.service;

import com.imnotdurnk.domain.auth.enums.TokenType;
import com.imnotdurnk.domain.calendar.dto.CalendarDto;
import com.imnotdurnk.domain.calendar.dto.CalendarStatisticDto;
import com.imnotdurnk.domain.calendar.dto.DiaryDto;
import com.imnotdurnk.domain.calendar.dto.PlanDetailDto;
import com.imnotdurnk.domain.calendar.entity.CalendarEntity;
import com.imnotdurnk.domain.calendar.repository.CalendarRepository;
import com.imnotdurnk.domain.calendar.repository.mapping.AlcoholAmount;
import com.imnotdurnk.domain.calendar.repository.mapping.AlcoholAmountImpl;
import com.imnotdurnk.domain.calendar.repository.mapping.PlanForMonth;
import com.imnotdurnk.domain.calendar.repository.mapping.PlanForMonthImpl;
import com.imnotdurnk.domain.gamelog.repository.GameLogRepository;
import com.imnotdurnk.domain.user.entity.UserEntity;
import com.imnotdurnk.domain.user.repository.UserRepository;
import com.imnotdurnk.global.exception.EntitySaveFailedException;
import com.imnotdurnk.global.exception.InvalidDateException;
import com.imnotdurnk.global.exception.InvalidTokenException;
import com.imnotdurnk.global.exception.ResourceNotFoundException;
import com.imnotdurnk.global.util.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CalendarServiceImpl implements CalendarService {

    private JwtUtil jwtUtil;
    private CalendarRepository calendarRepository;
    @Autowired
    private UserRepository userRepository;
    private GameLogRepository gameLogRepository;


    @Override
    public List<DiaryDto> getDiary(String token, int year, int month) {

        String email = jwtUtil.getUserEmail(token, TokenType.ACCESS);
        int id = userRepository.findByEmail(email).getId();

        List<DiaryDto> diary = calendarRepository.findAllDiary(id, year, month);

        return diary;
    }

    /***
     * 음주 일정(피드백) 등록하기 API
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
     * @param dateStr      조회할 캘린더의 날짜
     * @param token     사용자의 액세스 토큰
     * @return         지정된 날짜에 해당하는 사용자의 캘린더 목록을 담고 있는 CalendarDto 리스트
     *
     * @throws Exception 사용자의 이메일을 찾거나 캘린더를 조회하는 과정에서 발생할 수 있는 예외
     */
    @Override
    public List<CalendarDto> getCalendar(String token, String dateStr){
        UserEntity user = userRepository.findByEmail(jwtUtil.getUserEmail(token, TokenType.ACCESS));
        LocalDate date = LocalDate.parse(dateStr, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        List<CalendarEntity> calendarEntities = calendarRepository.findByUserEntity_IdAndDate(user.getId(), date);
        return calendarEntities.stream().map(CalendarEntity::toDto).collect(Collectors.toList());
    }

    /**
     * 음주 통계
     * 전월, 금월 음주 횟수 및 연간, 월간 총 음주량을 {@link CalendarStatisticDto} 객체에 담아 반환
     * @param dateStr 기준이 되는 날짜
     * @param token 유저 토큰
     * @return {@link CalendarStatisticDto}
     */
    @Override
    public CalendarStatisticDto getCalendarStatistic(String dateStr, String token) {
        UserEntity user = userRepository.findByEmail(jwtUtil.getUserEmail(token, TokenType.ACCESS));
        LocalDate date = LocalDate.parse(dateStr, DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        List<PlanForMonthImpl> planForMonths = getMonthlyPlanList(date);

        AlcoholAmount
                yearTotal = calendarRepository.sumAlcoholByYear(user.getId(), date.getYear());
        if (yearTotal == null) {
            yearTotal = new AlcoholAmountImpl(0.0, 0.0);
        }

        AlcoholAmount monthTotal = calendarRepository.sumAlcoholByMonth(user.getId(), date.getMonthValue(), date.getYear());
        if (monthTotal == null) {
            monthTotal = new AlcoholAmountImpl(0.0, 0.0);
        }

        return CalendarStatisticDto.builder()
                .planForMonths(planForMonths)
                .yearTotal(yearTotal)
                .monthTotal(monthTotal)
                .build();
    }

    /**
     * 현재 날짜 기준 최근 12개월의 음주 일정 횟수
     * @param today
     * @return 년, 월, 일정횟수를 필드로 갖는 {@link PlanForMonthImpl} 객체를 순서대로 리스트화 하여 반환
     */
    private List<PlanForMonthImpl> getMonthlyPlanList(LocalDate today) {

        LocalDateTime endDate = today.withDayOfMonth(today.lengthOfMonth()).atStartOfDay(); // 현재 월의 마지막 날
        LocalDateTime startDate = today.minusMonths(11).withDayOfMonth(1).atTime(LocalTime.MAX); // 11개월 전의 첫 번째 날

        List<PlanForMonth> planList = calendarRepository.findRecent12MonthsPlanCount(startDate, endDate);

        // 결과를 월, 연도별로 매핑
        Map<YearMonth, Integer> planMap = new HashMap<>();
        for (PlanForMonth plan : planList) {
            YearMonth yearMonth = YearMonth.of(plan.getYear(), plan.getMonth());
            planMap.put(yearMonth, plan.getCount());
        }

        // 12개월 동안의 데이터를 채우기
        List<PlanForMonthImpl> resultList = new ArrayList<>();
        for (int i = 11; i >= 0; i--) {
            YearMonth yearMonth = YearMonth.from(today).minusMonths(i);
            int count = planMap.getOrDefault(yearMonth, 0);
            PlanForMonthImpl plan = new PlanForMonthImpl(yearMonth.getMonthValue(), yearMonth.getYear(), count);
            resultList.add(plan);

            System.out.println(plan);
        }

        return resultList;
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
        DateTimeFormatter format = DateTimeFormatter.ofPattern("HH:mm");
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
                .arrivalTime(calendarEntity.getArrivalTime())
                .sojuAmount(calendarEntity.getSojuAmount())
                .beerAmount(calendarEntity.getBeerAmount())
                .id(calendarEntity.getId())
                .userId(calendarEntity.getUserEntity().getId())
		        .alcoholLevel(calendarEntity.getAlcoholLevel())
                .gameLogEntities(calendarEntity.getGameLogEntities())
                .date(calendarEntity.getDate())
                .build();
    }

    /***
     * planId를 통해 일정 삭제
     * @param accessToken
     * @param planId
     * @return 상세 일정 CalendarDto 객체
     * @throws ResourceNotFoundException 존재하지 않는 일정인 경우
     * @throws BadRequestException 사용자의 일정이 아닌 경우
     */
    @Transactional
    @Override
    public void deletePlan(String accessToken, int planId) throws ResourceNotFoundException, BadRequestException {

        //accessToken에 저장된 사용자 정보와 삭제하려는 일정의 사용자가 일치하는지 확인
        String tokenEmail = jwtUtil.getUserEmail(accessToken, TokenType.ACCESS);
        Optional<CalendarEntity> calendarEntity = calendarRepository.findById(planId);

        // 존재하지 않는 일정인 경우
        if (!calendarEntity.isPresent()) throw new ResourceNotFoundException("존재하지 않는 일정입니다.");

        //조회 요청한 일정을 등록한 사람의 이메일을 가져옴
        String userIdFromPlan = calendarEntity.get().getUserEntity().getEmail();

        //accessToken에 저장된 사용자 이메일과 조회 요청한 일정을 등록한 사용자의 이메일이 일치하지 않는 경우
        if(!tokenEmail.equals(userIdFromPlan)) throw new BadRequestException("잘못된 접근입니다.");

        // 연관된 게임 ID 삭제
        gameLogRepository.deleteByCalendarEntity(calendarEntity);

        // 일정 삭제
        calendarRepository.deleteById(planId);

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
