package com.imnotdurnk.domain.map.repository;

import com.imnotdurnk.domain.map.entity.StopEntity;
import com.imnotdurnk.domain.map.entity.StopTimeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StopTimeRepository extends JpaRepository<StopTimeEntity, String> {

}
