package com.imnotdurnk.domain.gamelog.entity;

import com.imnotdurnk.domain.gamelog.dto.VoiceDto;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "voice")
@Getter
@Setter
public class VoiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "log_id", nullable = false)
    private GameLogEntity gameLogEntity;

    @Lob
    @Column(name = "file_url", nullable = false)
    private String fileUrl;

    public VoiceEntity() {}

    @Builder
    public VoiceEntity(Integer id, GameLogEntity gameLogEntity, String fileUrl) {
        this.id = id;
        this.gameLogEntity = gameLogEntity;
        this.fileUrl = fileUrl;
    }

    /**
     * Entity -> Dto 변환 메서드
     * @return
     */
    public VoiceDto toDto() {
        return VoiceDto.builder()
                .id(id)
                .logId(gameLogEntity.getId())
                .fileUrl(fileUrl)
                .build();
    }

}
