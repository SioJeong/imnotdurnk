package com.imnotdurnk.domain.gamelog.service;

import com.imnotdurnk.domain.gamelog.dto.GameStatistic;

import java.time.LocalDate;

public interface GameLogService {

    GameStatistic getGameStatistic(String token, int gameType, LocalDate date);

}
