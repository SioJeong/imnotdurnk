package com.imnotdurnk.domain.gamelog.service;

import com.imnotdurnk.domain.gamelog.dto.GameLogDto;
import com.imnotdurnk.domain.gamelog.dto.GameStatistic;
import com.imnotdurnk.domain.gamelog.dto.VoiceResultDto;
import com.imnotdurnk.domain.gamelog.entity.GameLogEntity;
import org.apache.coyote.BadRequestException;

import java.time.LocalDate;

public interface GameLogService {

    GameStatistic getGameStatistic(String token, int gameType, String dateStr) throws Exception;

    GameLogEntity getGameLog(int logId);

    GameLogEntity savePronounceGameLog(String accessToken, VoiceResultDto voiceResultDto) throws BadRequestException;

    void saveGameResult(String accessToken, GameLogDto gameResult) throws BadRequestException;
}
