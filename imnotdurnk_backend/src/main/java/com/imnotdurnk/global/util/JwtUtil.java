package com.imnotdurnk.global.util;

import com.imnotdurnk.domain.auth.dto.TokenDto;
import com.imnotdurnk.domain.auth.enums.TokenType;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    private final int accessTokenExpireTime;
    private final int refreshTokenExpireTime;
    private final String accessTokenSecretKey;
    private final String refreshTokenSecreteKey;
    private final RedisUtil redisUtil;

    @Autowired
    public JwtUtil(
            @Value("${jwt.expiretime.accesstoken}") int accessTokenExpireTime, //엑세스 토큰 유효시간
            @Value("${jwt.expiretime.refreshtoken}") int refreshTokenExpireTime, //리프레시 토큰 유효시간
            @Value("${jwt.secretkey.accesstoken}") String accessTokenSecretKey, //엑세스 토큰 시크릿키
            @Value("${jwt.secretkey.refreshtoken}") String refreshTokenSecretKey, //리프레시 토큰 시크릿키
            RedisUtil redisUtil
    ){
        this.accessTokenExpireTime = accessTokenExpireTime;
        this.refreshTokenExpireTime = refreshTokenExpireTime;
        this.accessTokenSecretKey = accessTokenSecretKey;
        this.refreshTokenSecreteKey = refreshTokenSecretKey;
        this.redisUtil = redisUtil;
    }



    /***
     * 만료되는 시점을 반환하는 메소드
     * @param issuedAt
     * @param type
     * @return 만료되는 시점
     */
    private long getExpiration(long issuedAt, TokenType type){
        if(TokenType.ACCESS == type){
            return issuedAt + accessTokenExpireTime;
        } else if(TokenType.REFRESH == type){
            return issuedAt + refreshTokenExpireTime;
        }
        return 0L;
    }

    /***
     * 토큰 타입에 따라 다른 키를 이용하여 시크릿 키 발급
     * @param type
     * @return 시크릿 키
     */
    private SecretKey getSecretKey(TokenType type){
        //AccessToken과 RefreshToken을 서로 다른 키를 이용하여 발급
        //AccessToken과 RefreshToken을 서로 변경하여 인증 시도를 방지하기 위함

        if(TokenType.ACCESS == type){
            return Keys.hmacShaKeyFor(accessTokenSecretKey.getBytes());
        } else if(TokenType.REFRESH == type){
            return Keys.hmacShaKeyFor(refreshTokenSecreteKey.getBytes());
        }

        return null;
    }

    /***
     * 토큰 생성 메소드
     * @param email
     * @param type
     * @return 토큰
     */
    public TokenDto generateToken(String email, TokenType type){

        // 발급 시간과 만료 시간을 계산
        long issuedAt = System.currentTimeMillis();
        long expirationTime = getExpiration(issuedAt, type);

        String token = Jwts.builder()
                .claim("email", email)
                .issuedAt(new Date(issuedAt))
                .expiration(new Date(expirationTime))
                .signWith(getSecretKey(type))
                .compact();

        TokenDto tokenDto = new TokenDto();
        tokenDto.setEmail(email);
        tokenDto.setToken(token);
        tokenDto.setIssuedAt(issuedAt);
        tokenDto.setExpirationTime(expirationTime);

        return tokenDto;
    }


    /**
     * 유효한 토큰인지 판단하는 메소드
     * @param token
     * @param type
     * @return 유효 여부
     */
    public boolean isValidToken(String token, TokenType type){
        Jws<Claims> payload = null;

        try{
            payload = Jwts.parser()
                    .verifyWith(getSecretKey(type))
                    .build()
                    .parseSignedClaims(token);
        }catch (ExpiredJwtException | SignatureException | MalformedJwtException e){
            return false;
        }

        return true;
    }

    /***
     * 토큰에서 사용자 이메일을 얻어오는 함수
     * @param token
     * @param type
     * @return 이메일
     */
    public String getUserEmail(String token, TokenType type){
        if(isValidToken(token, type)){
            Claims payload = Jwts.parser()
                    .verifyWith(getSecretKey(type))
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            return payload.get("email", String.class);
        }
        return null;
    }

    /***
     * 토큰에서 만료 시점을 가져오는 메소드
     * @param token
     * @param type
     * @return 만료 시점
     */
    public long getExpirationTime(String token, TokenType type){
        if(isValidToken(token, type)){
            Claims payload = Jwts.parser()
                    .verifyWith(getSecretKey(type))
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            return payload.getExpiration().getTime();
        }
        return 0L;
    }

    /***
     * 토큰에서 정보(이메일, 만료시간, 생성시간)를 받아서 TokenDto로 저장하는 메소드
     * @param token
     * @param type
     * @return TokenDto
     */
    public TokenDto convertTokenToTokenDto(String token, TokenType type){
        TokenDto tokenDto = new TokenDto();

        tokenDto.setToken(token);
        tokenDto.setEmail(this.getUserEmail(token, type));
        tokenDto.setExpirationTime(this.getExpirationTime(token, type));

        return tokenDto;
    }


}