package com.imnotdurnk.domain.gamelog.repository;

import com.imnotdurnk.domain.gamelog.entity.VoiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VoiceRepository extends JpaRepository<VoiceEntity, Integer> {

    @Query("SELECT v FROM VoiceEntity v WHERE v.gameLogEntity.id = :logId")
    VoiceEntity findByLogId(int logId);

    @Query("DELETE FROM VoiceEntity v WHERE v.gameLogEntity.id = :logId")
    void deleteByLogId(int logId);
}
