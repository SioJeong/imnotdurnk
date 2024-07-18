package com.imnotdurnk.domain.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * TokenDto
 * 토큰 정보를 저장하는 DTO 클래스
 *
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TokenDto {
    String token;
    String email;
    long issuedAt;
    long expirationTime;

}