package com.imnotdurnk.domain.gamelog.controller;

import com.imnotdurnk.domain.gamelog.dto.GameStatistic;
import com.imnotdurnk.domain.gamelog.service.GameLogServiceImpl;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/game-logs")
@RequiredArgsConstructor
public class GameLogController {

    private static final int GAME_TYPE_COUNT = 4;

    private GameLogServiceImpl gameLogService;


    /**
     * 유저의 게임 통계
     * @param token 유저 인증 토큰
     * @param date  기준이 되는 날짜
     * @param gameType  게임의 종류
     * @return {@link GameStatistic}를 ResponseEntity body에 포함
     * @throws BadRequestException
     */
    @GetMapping("/statistics")
    public ResponseEntity<GameStatistic> getStatistics(@RequestAttribute(value = "AccessToken", required = true) String token,
                                                       @RequestParam LocalDate date,
                                                       @RequestParam int gameType) throws BadRequestException {

        if (date == null) {
            throw new BadRequestException("날짜 입력 실패");
        }
        if (gameType <= 0 || gameType > GAME_TYPE_COUNT) {
            throw new BadRequestException("게임 타입 오류");
        }

        // DB에 레코드가 없을 때 예외처리 필요
        GameStatistic gameStatistic = gameLogService.getGameStatistic(token, gameType, date);
        return ResponseEntity.ok().body(gameStatistic);
    }

}