package com.imnotdurnk.domain.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class TokenResponseDto {
    private String refreshToken;
    private String accessToken;
}
