package com.imnotdurnk.domain.gamelog.dto;

import com.imnotdurnk.domain.gamelog.entity.GameLogEntity;
import com.imnotdurnk.domain.gamelog.entity.VoiceEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VoiceDto {

    private Integer logId;

    private String fileName;

    private String fileUrl;

    public VoiceDto() {}

    @Builder
    public VoiceDto(Integer logId, String filename, String fileUrl) {
        this.logId = logId;
        this.fileName = filename;
        this.fileUrl = fileUrl;
    }

    /**
     * Dto -> Entity 변환 메서드
     * @param logEntity
     * @return
     */
    public VoiceEntity toEntity(GameLogEntity logEntity) {
        return VoiceEntity.builder()
                .gameLogEntity(logEntity)
                .fileName(fileName)
                .fileUrl(fileUrl)
                .build();
    }

}
