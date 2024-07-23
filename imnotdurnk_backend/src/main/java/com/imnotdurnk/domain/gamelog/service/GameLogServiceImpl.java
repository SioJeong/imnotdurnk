package com.imnotdurnk.domain.gamelog.service;

import com.imnotdurnk.domain.auth.enums.TokenType;
import com.imnotdurnk.domain.gamelog.dto.GameStatistic;
import com.imnotdurnk.domain.gamelog.repository.GameLogRepository;
import com.imnotdurnk.domain.user.entity.UserEntity;
import com.imnotdurnk.domain.user.repository.UserRepository;
import com.imnotdurnk.global.exception.InvalidDateException;
import com.imnotdurnk.global.exception.ResourceNotFoundException;
import com.imnotdurnk.global.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class GameLogServiceImpl implements GameLogService {

    private final GameLogRepository gameLogRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    private static final int GAME_TYPE_COUNT = 4;


    /**
     * 게임 통계 제공
     * 연평균, 월평균, 월평균대비 점수가 낮은 일수를 {@link GameStatistic}에 담아 반환하는 메서드
     * @param AccessToken 유저 인증 토큰
     * @param gameType
     * @param date
     * @return
     */
    @Override
    public GameStatistic getGameStatistic(String AccessToken, int gameType, LocalDate date) throws Exception{

        if (date == null) {
            throw new InvalidDateException("날짜 입력 오류");
        }

        if (gameType <= 0 || gameType > GAME_TYPE_COUNT) {
            throw new ResourceNotFoundException("게임 타입 오류");
        }

        UserEntity user = userRepository.findByEmail(jwtUtil.getUserEmail(AccessToken, TokenType.ACCESS));
        double monthAverage = gameLogRepository.selectMonthAverage(gameType, date.getMonthValue(), date.getYear());

        return GameStatistic.builder()
                .totalAverage(gameLogRepository.selectTotalAverage(user.getId(), gameType))
                .monthAverage(monthAverage)
                .lowerCount(gameLogRepository.countDaysWithLowScores(
                        gameType, date.getMonthValue(), date.getYear(), monthAverage))
                .build();
    }

}
