package com.imnotdurnk.domain.gamelog.entity;

import com.imnotdurnk.domain.gamelog.dto.VoiceDto;
import jakarta.persistence.*;
import lombok.Builder;

@Entity
@Table(name = "voice")
public class VoiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "log_id", nullable = false)
    private GameLogEntity gameLogEntity;

    @Lob
    @Column(name = "record", nullable = false)
    private byte[] record;

    public VoiceEntity() {}

    @Builder
    public VoiceEntity(GameLogEntity gameLogEntity, byte[] record) {
        this.gameLogEntity = gameLogEntity;
        this.record = record;
    }

    /**
     * Entity -> Dto 변환 메서드
     * @return
     */
    public VoiceDto toDto() {
        return VoiceDto.builder()
                .logId(gameLogEntity.getId())
                .record(record)
                .build();
    }

}
