package com.imnotdurnk.domain.gamelog.service;

import com.imnotdurnk.domain.gamelog.repository.GameLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class GameLogServiceImpl implements GameLogService {

    @Autowired
    private GameLogRepository gameLogRepository;


    @Override
    public double getTotalAverage(int gameType) {
        return gameLogRepository.selectTotalAverage(gameType);
    }

    @Override
    public double getMonthAverage(int gameType, LocalDate date) {
        return gameLogRepository.selectMonthAverage(gameType, date.getMonthValue(), date.getYear());
    }

    @Override
    public int getLowerCount(int gameType, LocalDate date, double monthAverage) {
        return gameLogRepository.countDaysWithLowScores(
                gameType, date.getMonthValue(), date.getYear(), monthAverage);
    }
}
