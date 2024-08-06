package com.imnotdurnk.domain.map.repository;

import com.imnotdurnk.domain.map.entity.RouteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RouteRepository extends JpaRepository<RouteEntity, String> {}
