package com.imnotdurnk.domain.gamelog.repository;

import com.imnotdurnk.domain.gamelog.entity.VoiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoiceRepository extends JpaRepository<VoiceEntity, Integer> {


}
