package com.imnotdurnk.domain.gamelog.service;

import com.imnotdurnk.domain.gamelog.dto.VoiceDto;
import com.imnotdurnk.domain.gamelog.entity.GameLogEntity;
import com.imnotdurnk.domain.gamelog.entity.VoiceEntity;
import com.imnotdurnk.domain.gamelog.repository.VoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VoiceServiceImpl implements VoiceService {

    private final VoiceRepository voiceRepository;

    @Override
    public boolean addVoice(GameLogEntity gameLogEntity, VoiceDto voiceDto) {
        VoiceEntity voiceEntity = voiceDto.toEntity(gameLogEntity);
        return voiceRepository.save(voiceEntity) != null;
    }

    @Override
    public VoiceDto getVoiceByLogId(int logId) {
        return voiceRepository.findByLogId(logId).toDto();
    }

    @Override
    public boolean removeVoiceByLogId(int logId) {
        voiceRepository.deleteByLogId(logId);
        return voiceRepository.findByLogId(logId) == null;
    }

}
