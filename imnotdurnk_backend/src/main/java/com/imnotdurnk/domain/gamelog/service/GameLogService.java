package com.imnotdurnk.domain.gamelog.service;

import com.imnotdurnk.domain.gamelog.dto.GameStatistic;
import com.imnotdurnk.domain.gamelog.dto.VoiceResultDto;
import com.imnotdurnk.domain.gamelog.entity.GameLogEntity;
import org.apache.coyote.BadRequestException;

import java.time.LocalDate;

public interface GameLogService {

    GameStatistic getGameStatistic(String token, int gameType, LocalDate date) throws Exception;

    GameLogEntity getGameLog(int logId);

    GameLogEntity savePronounceGameLog(String accessToken, VoiceResultDto voiceResultDto) throws BadRequestException;

}
