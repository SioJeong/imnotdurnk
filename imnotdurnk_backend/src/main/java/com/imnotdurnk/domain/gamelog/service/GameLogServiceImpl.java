package com.imnotdurnk.domain.gamelog.service;

import com.imnotdurnk.domain.auth.enums.TokenType;
import com.imnotdurnk.domain.gamelog.repository.GameLogRepository;
import com.imnotdurnk.domain.user.entity.UserEntity;
import com.imnotdurnk.domain.user.repository.UserRepository;
import com.imnotdurnk.global.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class GameLogServiceImpl implements GameLogService {

    private final GameLogRepository gameLogRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    /**
     * 유저의 게임별 전체 평균점수
     * @param token 유저인증 토큰
     * @param gameType  게임 종류
     * @return
     */
    @Override
    public double getTotalAverage(String token, int gameType) {
        UserEntity user = userRepository.findByEmail(jwtUtil.getUserEmail(token, TokenType.ACCESS));
        return gameLogRepository.selectTotalAverage(user.getId(), gameType);
    }

    /**
     * 유저의 게임별 월평균점수
     * @param gameType  게임 종류
     * @param date  기준이 되는 날짜
     * @return
     */
    @Override
    public double getMonthAverage(int gameType, LocalDate date) {
        return gameLogRepository.selectMonthAverage(gameType, date.getMonthValue(), date.getYear());
    }

    /**
     * 월평균 점수보다 낮은 기록이 있는 날의 일수
     * @param gameType  게임 종류
     * @param date  기준이 되는 날짜
     * @param monthAverage  월평균 점수
     * @return
     */
    @Override
    public int getLowerCount(int gameType, LocalDate date, double monthAverage) {
        return gameLogRepository.countDaysWithLowScores(
                gameType, date.getMonthValue(), date.getYear(), monthAverage);
    }
}
