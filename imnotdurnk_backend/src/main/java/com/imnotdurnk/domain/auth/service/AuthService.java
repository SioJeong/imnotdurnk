package com.imnotdurnk.domain.auth.service;

import com.imnotdurnk.domain.auth.dto.TokenDto;
import com.imnotdurnk.domain.auth.enums.TokenType;

/**
 *
 * AuthService 인터페이스
 *
 */

public interface AuthService {
    TokenDto generateToken(String email, TokenType tokenType);
    TokenDto reissueToken(String refreshToken, String prevToken, TokenType tokenType);

    boolean isPresentToken(String refreshToken);
    void saveRefreshToken(TokenDto refreshToken);
}
