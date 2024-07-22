package com.imnotdurnk.domain.gamelog.dto;

import com.imnotdurnk.domain.gamelog.entity.GameLogEntity;
import com.imnotdurnk.domain.gamelog.entity.VoiceEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VoiceDto {

    private Integer logId;

    private byte[] record;

    public VoiceDto() {}

    @Builder
    public VoiceDto(Integer logId, byte[] record) {
        this.logId = logId;
        this.record = record;
    }

    /**
     * Dto -> Entity 변환 메서드
     * @param logEntity
     * @return
     */
    public VoiceEntity toEntity(GameLogEntity logEntity) {
        return VoiceEntity.builder()
                .gameLogEntity(logEntity)
                .record(record)
                .build();
    }

}
