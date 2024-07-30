package com.imnotdurnk.domain.gamelog.service;

import com.imnotdurnk.domain.gamelog.dto.VoiceDto;
import com.imnotdurnk.domain.gamelog.entity.GameLogEntity;

public interface VoiceService {

    boolean addVoice(GameLogEntity gameLogEntity, VoiceDto voiceDto);

    VoiceDto getVoiceByLogId(int logId);

    boolean removeVoiceByLogId(int logId);
}
