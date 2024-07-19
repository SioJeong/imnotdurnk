package com.imnotdurnk.domain.auth.service;

import com.imnotdurnk.domain.auth.dto.TokenDto;
import com.imnotdurnk.domain.auth.enums.TokenType;
import com.imnotdurnk.global.util.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 *
 * AuthServiceImpl
 * 사용자 인증 관련을 작업을 처리하는 서비스
 *
 */

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final JwtUtil jwtUtil;

    /**
     *
     * 토큰 생성
     * @param email
     * @param tokenType
     * @return 생성된 토큰 DTO
     */
    @Override
    public TokenDto generateToken(String email, TokenType tokenType) {
        //type에 맞는 token 생성
        TokenDto token = jwtUtil.generateToken(email, tokenType);

        //Redis에 refresh token 저장
        if(tokenType == TokenType.REFRESH){
            jwtUtil.saveRefreshTokenInRedis(token);
        }

        return token;

    }

    /**
     * 토큰 재발급
     * @param refreshToken
     * @param prevToken
     * @param tokenType
     * @return 생성된 토큰 DTO
     */
    @Override
    public TokenDto reissueToken(String refreshToken, String prevToken, TokenType tokenType) {

        //String 타입인 토큰을 해석해서 TokenDto 객체로 저장
        TokenDto refreshTokenDto = jwtUtil.convertTokenToTokenDto(refreshToken, TokenType.REFRESH);

        // refresh token 검증
        if(!jwtUtil.isValidToken(refreshTokenDto.getToken(), TokenType.REFRESH)){
            System.out.println("유효기간 만료");
            return null;
        }

        //refresh token 재발급 요청했지만 Redis에 기존 refresh token이 존재하지 않음
        if(tokenType == TokenType.REFRESH && !jwtUtil.checkRefreshTokenInRedis(prevToken)){
            System.out.println("존재하지않음");
            return null;
        }

        // refresh token 검증 완료시 기존의 refresh token 폐기
        if(prevToken != null && jwtUtil.isValidToken(prevToken, tokenType)){
            jwtUtil.deleteRefreshTokenInRedis(prevToken);
        }

        //재발급
        TokenDto newToken = jwtUtil.generateToken(refreshTokenDto.getEmail(), tokenType);

        //refresh token이면 redis에 저장
        if(tokenType == TokenType.REFRESH){
            jwtUtil.saveRefreshTokenInRedis(newToken);
        }

        return newToken;
    }



}


