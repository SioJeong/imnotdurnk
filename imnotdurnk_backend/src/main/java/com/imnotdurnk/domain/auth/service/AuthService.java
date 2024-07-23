package com.imnotdurnk.domain.auth.service;

import com.imnotdurnk.domain.auth.dto.TokenDto;
import com.imnotdurnk.domain.auth.enums.TokenType;
import com.imnotdurnk.global.exception.InvalidTokenException;

/**
 *
 * AuthService 인터페이스
 *
 */

public interface AuthService {
    TokenDto generateToken(String email, TokenType tokenType);
    TokenDto reissueToken(String refreshToken, String prevToken, TokenType tokenType);
    boolean isTokenValid(String token, TokenType tokenType) throws InvalidTokenException;
    void saveRefreshTokenInRedis(TokenDto refreshToken);
    boolean checkTokenInRedis(String token);
    void deleteRefreshTokenInRedis(String refreshToken);
    void addAccessTokenToBlackListInRedis(String accessToken);
}
