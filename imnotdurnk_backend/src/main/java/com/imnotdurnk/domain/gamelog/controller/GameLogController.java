package com.imnotdurnk.domain.gamelog.controller;

import com.imnotdurnk.domain.gamelog.dto.GameStatistic;
import com.imnotdurnk.domain.gamelog.service.GameLogServiceImpl;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/game-logs")
public class GameLogController {

    private static final int GAME_TYPE_COUNT = 4;

    @Autowired
    private GameLogServiceImpl gameLogService;


    @GetMapping("/statistics")
    public ResponseEntity<GameStatistic> getStatistics(@RequestParam LocalDate date, @RequestParam int gameType) throws BadRequestException {

        if (date == null) {
            throw new BadRequestException("날짜 입력 실패");
        }
        if (gameType <= 0 || gameType > GAME_TYPE_COUNT) {
            throw new BadRequestException("게임 타입 오류");
        }

        GameStatistic gameStatistic = GameStatistic.builder()
                .totalAverage(gameLogService.getTotalAverage(gameType))
                .monthAverage(gameLogService.getMonthAverage(gameType, date))
                .build();
        gameStatistic.setLowerCount(gameLogService.getLowerCount(
                gameType, date, gameStatistic.getMonthAverage()));

        return ResponseEntity.ok().body(gameStatistic);
    }

}