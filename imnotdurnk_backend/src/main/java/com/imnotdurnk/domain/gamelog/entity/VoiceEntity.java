package com.imnotdurnk.domain.gamelog.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "voice")
public class VoiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private int id;

    @ManyToOne
    @JoinColumn(name = "log_id", nullable = false)
    private GameLogEntity gameLogEntity;

    @Lob
    @Column(name = "record", nullable = false)
    private byte[] record;

}
