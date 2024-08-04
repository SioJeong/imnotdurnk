package com.imnotdurnk.domain.gamelog.controller;

import com.imnotdurnk.domain.gamelog.dto.GameStatistic;
import com.imnotdurnk.domain.gamelog.service.GameLogService;
import com.imnotdurnk.global.exception.InvalidDateException;
import com.imnotdurnk.global.exception.ResourceNotFoundException;
import com.imnotdurnk.global.response.SingleResponse;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.regex.Pattern;

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

    private final GameLogService gameLogService;

    private static final int GAME_TYPE_COUNT = 4;


    /**
     * 유저의 게임 통계
     * @param token 유저 인증 토큰
     * @param dateStr  기준이 되는 날짜
     * @param gameType  게임의 종류
     * @return {@link GameStatistic}를 ResponseEntity body에 포함
     * @throws BadRequestException
     */
    @GetMapping("/statistics")
    public ResponseEntity<SingleResponse<GameStatistic>> getStatistics
            (@RequestAttribute(value = "AccessToken", required = true) String token,
             @RequestParam String dateStr,
             @RequestParam int gameType) throws Exception {

        if(!checkDate(dateStr)) throw new InvalidDateException("날짜 입력 오류");

        if (gameType <= 0 || gameType > GAME_TYPE_COUNT) {
            throw new ResourceNotFoundException("게임 타입 오류");
        }

        GameStatistic gameStatistic = gameLogService.getGameStatistic(token, gameType, dateStr);

        SingleResponse<GameStatistic> response = new SingleResponse<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("게임 통계 응답 완료");
        response.setData(gameStatistic);

        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

    /***
     * 날짜 유효성 체크
     *      yyyy-MM-dd 형태
     * @param date
     * @return 기준에 부합하면 true, 아니면 false
     */
    public boolean checkDate(String date) {
        if(date==null) return false;
        return Pattern.matches("^\\d{4}-\\d{2}-\\d{2}$", date);
    }

}