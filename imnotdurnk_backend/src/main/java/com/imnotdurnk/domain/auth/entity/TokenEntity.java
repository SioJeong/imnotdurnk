package com.imnotdurnk.domain.auth.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

/**
 *
 * TokenEntity
 * Redis와 연결되는 Token 저장 엔티티 클래스
 *
 */

@RedisHash(value = "token", timeToLive = 432000)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TokenEntity {

    @Id
    private String token;

    private String email;

//    모든 인스턴스의 만료 기간이 동일하다면 @RedisHash에 TTL을 설정할 수 있음)
//    @TimeToLive
//    private Long expiration;

}
