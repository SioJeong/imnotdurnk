package com.imnotdurnk.domain.auth.service;

import com.imnotdurnk.domain.auth.dto.TokenDto;
import com.imnotdurnk.domain.auth.enums.TokenType;
import com.imnotdurnk.global.exception.InvalidTokenException;
import com.imnotdurnk.global.util.HashUtil;
import com.imnotdurnk.global.util.JwtUtil;
import com.imnotdurnk.global.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


/**
 *
 * AuthServiceImpl
 * 사용자 인증 관련을 작업을 처리하는 서비스
 *
 */

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final JwtUtil jwtUtil;
    private final HashUtil hashUtil;
    private final RedisUtil redisUtil;

    @Value("${jwt.expiretime.refreshtoken}")
    private int refreshTokenExpireTime;

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
            saveRefreshTokenInRedis(token);
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
        if(tokenType == TokenType.REFRESH && !checkTokenInRedis(prevToken)){
            System.out.println("존재하지않음");
            return null;
        }

        // refresh token 검증 완료시 기존의 refresh token 폐기
        if(prevToken != null && jwtUtil.isValidToken(prevToken, tokenType)){
            deleteRefreshTokenInRedis(prevToken);
        }

        //재발급
        TokenDto newToken = jwtUtil.generateToken(refreshTokenDto.getEmail(), tokenType);

        //refresh token이면 redis에 저장
        if(tokenType == TokenType.REFRESH){
            saveRefreshTokenInRedis(newToken);
        }

        return newToken;
    }

    @Override
    public boolean isTokenValid(String token, TokenType tokenType) throws InvalidTokenException {

        String email = jwtUtil.getUserEmail(token, tokenType);
        String tokenHash = hashUtil.getDigest(token);

        // 토큰이 존재하고, valid하고
        if (token != null && jwtUtil.isValidToken(token, tokenType)) {

            if(tokenType == TokenType.ACCESS && !checkTokenInRedis(token)){
                //access token의 경우 블랙리스트에 존재하지 않으면 true
                return true;
            } else if(tokenType == TokenType.REFRESH && checkTokenInRedis(token)){
                //refresh token의 경우 redis에 저장되어있으면 true
                return true;
            }
        }

        // 토큰이 invalid하면 예외를 던짐
        throw new InvalidTokenException("토큰 인증 실패");

    }

    /**
     * 엑세스토큰을 블랙리스트에 추가
     * @param accessToken
     */
    @Override
    public void addAccessTokenToBlackListInRedis(String accessToken){
        //토큰에서 정보 및 만료 시간을 구해서 TokenDto 객체에 넣음
        TokenDto token = jwtUtil.convertTokenToTokenDto(accessToken, TokenType.ACCESS);
        //만료까지 남은 시간을 계산하고 밀리초->초 단위로 변경
        long leftTime = (token.getExpirationTime() - System.currentTimeMillis()) / 1000;

        //redis에 저장
        redisUtil.setDataExpire(accessToken, token.getEmail(), leftTime);
    }

    /***
     * 리프레시 토큰을 redis에 저장
     * @param refreshToken
     */
    @Override
    public void saveRefreshTokenInRedis(TokenDto refreshToken){
        //key: refresh token, value: email, duration: 만료시간
        redisUtil.setDataExpire(refreshToken.getToken(), refreshToken.getEmail(), refreshTokenExpireTime/1000);
    }


    /***
     * 리프레시 토큰이 redis에 저장되어 있는지 확인(=유효한 리프레시 토큰인지)
     * @param token
     * @return redis에 저장되어있는지 여부
     */
    @Override
    public boolean checkTokenInRedis(String token){
        if(redisUtil.getData(token) != null){
            //redis에 토큰이 저장되어 있는 경우
            return true;
        } else {
            //redis에 토큰이 저장되어 있지 않은 경우
            return false;
        }
    }

    /***
     * 리프레시 토큰을 redis에서 삭제
     * @param refreshToken
     */
    @Override
    public void deleteRefreshTokenInRedis(String refreshToken){

        redisUtil.deleteData(refreshToken);
    }

}


