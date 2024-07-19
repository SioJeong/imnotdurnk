package com.imnotdurnk.domain.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthDto {
    TokenDto accessToken;
    TokenDto refreshToken;
}
