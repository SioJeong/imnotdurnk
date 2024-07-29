package com.imnotdurnk.domain.gamelog.service;

import com.imnotdurnk.domain.calendar.dto.CalendarDto;
import com.imnotdurnk.domain.calendar.entity.CalendarEntity;
import com.imnotdurnk.domain.gamelog.dto.GameStatistic;
import com.imnotdurnk.domain.gamelog.dto.VoiceDto;
import com.imnotdurnk.domain.gamelog.entity.GameLogEntity;

import java.time.LocalDate;

public interface GameLogService {

    GameStatistic getGameStatistic(String token, int gameType, LocalDate date) throws Exception;

    GameLogEntity getGameLog(int logId);
}
