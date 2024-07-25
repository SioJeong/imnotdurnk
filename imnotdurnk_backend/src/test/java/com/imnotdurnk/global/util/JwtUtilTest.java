package com.imnotdurnk.global.util;

import com.imnotdurnk.domain.auth.dto.TokenDto;
import com.imnotdurnk.domain.auth.enums.TokenType;
import com.imnotdurnk.global.exception.InvalidTokenException;
import com.imnotdurnk.global.exception.RequiredFieldMissingException;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
public class JwtUtilTest {

    @Autowired
    private JwtUtil jwtUtil;
    private final String email = "test@test.com";

    @DisplayName("access token을 생성한다.")
    @Test
    void createAccessToken(){
        TokenDto token = jwtUtil.generateToken(email, TokenType.ACCESS);
        Assertions.assertThat(token).hasNoNullFieldsOrProperties();
    }

    @DisplayName("refresh token을 생성한다.")
    @Test
    void createRefreshToken(){
        TokenDto token = jwtUtil.generateToken(email, TokenType.REFRESH);
        Assertions.assertThat(token).hasNoNullFieldsOrProperties();
    }

    @DisplayName("타입이 누락된 상태로 token 생성을 요청하여 RequiredFieldMissingException이 발생하였다.")
    @Test
    void missingFieldCreateToken(){
        TokenDto token = jwtUtil.generateToken(email, null);
        Assertions.shouldHaveThrown(RequiredFieldMissingException.class);
    }

    @DisplayName("생성한 access token이 유효한지 판단한다.")
    @Test
    void isValidToken(){
        TokenDto token = jwtUtil.generateToken(email, TokenType.ACCESS);
        boolean isValid = jwtUtil.isValidToken(token.getToken(), TokenType.ACCESS);

        Assertions.assertThat(isValid).isTrue();
    }

    @DisplayName("생성한 access token에서 사용자 이메일을 가져온다.")
    @Test
    void getUserEmailFromToken(){
        TokenDto token = jwtUtil.generateToken(email, TokenType.ACCESS);
        String emailFromToken = jwtUtil.getUserEmail(token.getToken(), TokenType.ACCESS);

        Assertions.assertThat(emailFromToken).isEqualTo(email);
    }

    @DisplayName("잘못된 token을 입력 받았을 때 사용자 이메일이 아닌 null을 반환한다.")
    @Test
    void getUserEmailFromWrongToken(){
        String emailFromWrongToken = jwtUtil.getUserEmail("token", TokenType.ACCESS);

        Assertions.assertThat(emailFromWrongToken).isNull();
    }

    @DisplayName("토큰(String)과 타입을 받았을 때 TokenDto로 변환한다.")
    @Test
    void convertTokenToTokenDto(){
        TokenDto testToken = jwtUtil.generateToken(email, TokenType.ACCESS);
        TokenDto resultToken = jwtUtil.convertTokenToTokenDto(testToken.getToken(), TokenType.ACCESS);

        Assertions.assertThat(resultToken).usingRecursiveComparison()
                .ignoringFields("issuedAt")
                .ignoringFields("expirationTime")
                .isEqualTo(testToken);
        Assertions.assertThat(resultToken.getExpirationTime()/1000).isEqualTo(testToken.getExpirationTime()/1000);
    }

    @DisplayName("DTO로 변환하기 위해 입력 받은 토큰이 잘못되었을 때 InvalidTokenException을 던진다")
    @Test
    void convertWrongToken(){
        jwtUtil.convertTokenToTokenDto("token", TokenType.ACCESS);
        Assertions.shouldHaveThrown(InvalidTokenException.class);
    }


}
