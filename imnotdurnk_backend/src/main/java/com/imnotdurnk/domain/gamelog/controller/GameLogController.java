package com.imnotdurnk.domain.gamelog.controller;

import com.imnotdurnk.domain.gamelog.dto.GameLogDto;
import com.imnotdurnk.domain.gamelog.dto.GameStatistic;
import com.imnotdurnk.domain.gamelog.dto.Question;
import com.imnotdurnk.domain.gamelog.service.GameLogService;
import com.imnotdurnk.global.commonClass.CommonResponse;
import com.imnotdurnk.global.exception.InvalidDateException;
import com.imnotdurnk.global.exception.ResourceNotFoundException;
import com.imnotdurnk.global.response.SingleResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.apache.http.protocol.HTTP;
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
    @Operation(
            summary = "유저의 게임 통계"
    )
    @GetMapping("/statistics")
    public ResponseEntity<SingleResponse<GameStatistic>> getStatistics
            (@RequestAttribute(value = "AccessToken", required = true) String token,
             @RequestParam String dateStr,
             @RequestParam int gameType) throws Exception {

        if(!checkDate(dateStr)) throw new InvalidDateException("날짜 입력 오류");

        if (gameType <= 0 || gameType > GAME_TYPE_COUNT) {
            throw new BadRequestException("게임 타입 오류");
        }

        GameStatistic gameStatistic = gameLogService.getGameStatistic(token, gameType, dateStr);

        SingleResponse<GameStatistic> response = new SingleResponse<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("게임 통계 응답 완료");
        response.setData(gameStatistic);

        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

    /**
     * 발음 평가를 제외한 게임 결과 저장 API
     * @param accessToken
     * @param gameResult
     * @return
     */
    @Operation(
            summary = "발음 평가를 제외한 게임 결과 저장"
    )
    @PostMapping("/save")
    public ResponseEntity<?> saveGameResult(@RequestAttribute(value = "AccessToken", required = true) String accessToken,
                                            @RequestBody GameLogDto gameResult) throws BadRequestException {

        //유효성 검사 (plan id, 게임 점수(0-100), 게임 타입)
        if(gameResult.getPlanId() == null) throw new BadRequestException("필드 누락");
        if(gameResult.getScore() == null ) throw new BadRequestException("필드 누락");
        if(gameResult.getScore() < 0 || gameResult.getScore() > 100) throw new BadRequestException("범위를 벗어난 점수");
        if(gameResult.getGameType() < 1 || gameResult.getGameType() > GAME_TYPE_COUNT) throw new BadRequestException("올바르지 않은 게임 타입");

        gameLogService.saveGameResult(accessToken, gameResult);

        CommonResponse response = new CommonResponse();
        response.setMessage("저장 완료");
        response.setStatusCode(HttpStatus.OK.value());

        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

    /**
     * 게임용 랜덤 문장 제공 API
     * @return
     */
    @Operation(
            summary = "게임용 랜덤 문장 제공"
    )
    @GetMapping("/question")
    public ResponseEntity<SingleResponse<String>> getQuestion() {

        String question = Question.getRandom();
        if (question == null) throw new ResourceNotFoundException("제공된 문장이 없음");

        SingleResponse<String> response = new SingleResponse<>(HttpStatus.OK.value(), "랜덤문장 제공 완료", question);
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