package com.imnotdurnk.domain.auth.repository;

import com.imnotdurnk.domain.auth.entity.TokenEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 *
 * TokenRepository
 * Redis와 Entity 클래스트를 맵핑하고 CRUD 작업을 담당하는 interface
 *
 */

@Repository
public interface TokenRepository extends CrudRepository<TokenEntity, String> {
    Optional<TokenEntity> findByToken(String token);
}
