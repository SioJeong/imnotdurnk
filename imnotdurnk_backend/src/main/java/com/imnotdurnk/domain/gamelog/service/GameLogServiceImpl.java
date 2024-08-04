package com.imnotdurnk.domain.gamelog.service;

import com.imnotdurnk.domain.auth.enums.TokenType;
import com.imnotdurnk.domain.calendar.service.CalendarService;
import com.imnotdurnk.domain.gamelog.dto.GameStatistic;
import com.imnotdurnk.domain.gamelog.dto.VoiceDto;
import com.imnotdurnk.domain.gamelog.dto.VoiceResultDto;
import com.imnotdurnk.domain.gamelog.entity.GameLogEntity;
import com.imnotdurnk.domain.gamelog.repository.GameLogRepository;
import com.imnotdurnk.domain.user.entity.UserEntity;
import com.imnotdurnk.domain.user.repository.UserRepository;
import com.imnotdurnk.global.exception.EntitySaveFailedException;
import com.imnotdurnk.global.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class GameLogServiceImpl implements GameLogService {

    private final GameLogRepository gameLogRepository;
    private final UserRepository userRepository;
    private final CalendarService calendarService;
    private final JwtUtil jwtUtil;

    //게임타입
    private final int GAME_TYPE_PRONOUNCE = 1; //발음

    /**
     * 게임 통계 제공
     * 연평균, 월평균, 월평균대비 점수가 낮은 일수를 {@link GameStatistic}에 담아 반환하는 메서드
     * @param AccessToken 유저 인증 토큰
     * @param gameType
     * @param dateStr
     * @return
     */
    @Override
    public GameStatistic getGameStatistic(String AccessToken, int gameType, String dateStr) {

        UserEntity user = userRepository.findByEmail(jwtUtil.getUserEmail(AccessToken, TokenType.ACCESS));
        LocalDate date = LocalDate.parse(dateStr, DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        double monthAverage = gameLogRepository.selectMonthAverage(gameType, date.getMonthValue(), date.getYear());

        System.out.println(monthAverage);
        return GameStatistic.builder()
                .totalAverage(gameLogRepository.selectTotalAverage(user.getId(), gameType))
                .monthAverage(monthAverage)
                .lowerCount(gameLogRepository.countDaysWithLowScores(
                        gameType, date.getMonthValue(), date.getYear(), monthAverage))
                .build();
    }

    @Override
    public GameLogEntity getGameLog(int logId) {
        return gameLogRepository.findById(logId);
    }

    /***
     * 발음 평가 게임 결과를 저장
     * @param voiceResultDto
     * @return 저장한 {@link GameLogEntity} 객체
     */
    @Override
    public GameLogEntity savePronounceGameLog(String accessToken, VoiceResultDto voiceResultDto) throws BadRequestException {
        
        GameLogEntity gameLogEntity = GameLogEntity.builder()
                .calendarEntity(calendarService.isSameUserAndGetCalendarEntity(accessToken, voiceResultDto.getPlanId())) //일정
                .score(voiceResultDto.getScore()) //점수
                .gameType(GAME_TYPE_PRONOUNCE) //게임 타입
                .build();

        gameLogEntity = gameLogRepository.save(gameLogEntity);

        if(gameLogEntity == null) throw new EntitySaveFailedException("게임 결과 저장 실패");

        return gameLogEntity;
    }



}
