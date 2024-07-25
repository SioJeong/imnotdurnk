package com.imnotdurnk.domain.gamelog.controller;

import com.imnotdurnk.domain.gamelog.dto.GameStatistic;
import com.imnotdurnk.domain.gamelog.service.GameLogServiceImpl;
import com.imnotdurnk.global.exception.InvalidDateException;
import com.imnotdurnk.global.exception.ResourceNotFoundException;
import com.imnotdurnk.global.response.SingleResponse;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

/**
 *
 * GameLogController
 * 게임 로그 관련 통계를 전담하는 컨트롤러
 *
 */

@RestController
@RequestMapping("/game-logs")
@RequiredArgsConstructor
public class GameLogController {

    private GameLogServiceImpl gameLogService;

    private static final int GAME_TYPE_COUNT = 4;


    /**
     * 유저의 게임 통계
     * @param token 유저 인증 토큰
     * @param date  기준이 되는 날짜
     * @param gameType  게임의 종류
     * @return {@link GameStatistic}를 ResponseEntity body에 포함
     * @throws BadRequestException
     */
    @GetMapping("/statistics")
    public ResponseEntity<SingleResponse<GameStatistic>> getStatistics
            (@RequestAttribute(value = "AccessToken", required = true) String token,
             @RequestParam LocalDate date,
             @RequestParam int gameType) {

        if (date == null) {
            throw new InvalidDateException("날짜 입력 오류");
        }

        if (gameType <= 0 || gameType > GAME_TYPE_COUNT) {
            throw new ResourceNotFoundException("게임 타입 오류");
        }

        GameStatistic gameStatistic = gameLogService.getGameStatistic(token, gameType, date);

        SingleResponse<GameStatistic> response = new SingleResponse<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("게임 통계 응답 완료");
        response.setData(gameStatistic);

        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

}