package com.imnotdurnk.domain.auth.service;

import com.imnotdurnk.domain.auth.dto.TokenDto;
import com.imnotdurnk.domain.auth.entity.TokenEntity;
import com.imnotdurnk.domain.auth.enums.TokenType;
import com.imnotdurnk.domain.auth.repository.TokenRepository;
import com.imnotdurnk.global.util.HashUtil;
import com.imnotdurnk.global.util.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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
    private final HashUtil hashUtil;
    private final TokenRepository tokenRepository;


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
            saveRefreshToken(token);
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

        TokenDto refreshTokenDto = jwtUtil.convertTokenToTokenDto(refreshToken, TokenType.REFRESH);

        // refresh token 검증
        if(!jwtUtil.isValidToken(refreshTokenDto.getToken(), TokenType.REFRESH)){
            System.out.println("유효기간 만료");
            return null;
        }

        //refresh token 재발급 요청했지만 Redis에 기존 refresh token이 존재하지 않음
        if(tokenType == TokenType.REFRESH && !isPresentToken(prevToken)){
            System.out.println("존재하지않음");
            return null;
        }

        // refresh token 검증 완료시 기존의 refresh token 폐기 후 재발급
        if(prevToken != null && jwtUtil.isValidToken(prevToken, tokenType)){
            TokenEntity preToken = new TokenEntity();
            preToken.setToken(prevToken);
            preToken.setEmail(refreshTokenDto.getEmail());
            tokenRepository.delete(preToken);
        }

        //재발급
        TokenDto newToken = jwtUtil.generateToken(refreshTokenDto.getEmail(), tokenType);

        //refresh token이면 redis에 저장
        if(tokenType == TokenType.REFRESH){
            saveRefreshToken(newToken);
        }

        return newToken;
    }


    /**
     * 토큰을 Redis에 저장
     * @param refreshToken
     */
    @Override
    public void saveRefreshToken(TokenDto refreshToken) {

        TokenEntity tokenEntity = new TokenEntity();
        tokenEntity.setToken(refreshToken.getToken());
        tokenEntity.setEmail(refreshToken.getEmail());

        tokenRepository.save(tokenEntity);

    }

    /**
     * Redis에 refresh token이 존재하는지 확인하는 함수
     * @param refreshToken
     * @return 존재 여부
     */
    @Override
    public boolean isPresentToken(String refreshToken){
        Optional<TokenEntity> savedToken = tokenRepository.findByToken(refreshToken);
        if (savedToken.isPresent()) {
            System.out.println(savedToken.get().getToken());
            return true;
        } else {
            return false;
        }
    }


}


