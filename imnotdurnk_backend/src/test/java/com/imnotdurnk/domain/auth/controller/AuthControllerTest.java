package com.imnotdurnk.domain.auth.controller;

import com.imnotdurnk.domain.auth.dto.TokenDto;
import com.imnotdurnk.domain.auth.enums.TokenType;
import com.imnotdurnk.domain.auth.service.AuthService;
import com.imnotdurnk.global.util.JwtUtil;
import com.imnotdurnk.global.util.RedisUtil;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.*;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockCookie;
import org.springframework.test.web.servlet.MockMvc;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Auth 통합테스트
 */
@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @MockBean
    private RedisUtil redisUtil;

    private TokenDto refreshTokenDto;
    private TokenDto accessTokenDto;
    private String refreshToken;
    private String accessToken;

    @BeforeEach
    public void setup(){
        refreshTokenDto = jwtUtil.generateToken("test@example.com", TokenType.REFRESH);
        refreshToken = refreshTokenDto.getToken();

        accessTokenDto = jwtUtil.generateToken("test@example.com", TokenType.ACCESS);
        accessToken = accessTokenDto.getToken();

        Mockito.when(authService.isTokenValid(refreshToken, TokenType.REFRESH)).thenReturn(true);
        Mockito.when(authService.isTokenValid(accessToken, TokenType.ACCESS)).thenReturn(true);
    }

    @DisplayName("리프레시 토큰 재발급")
    @Test
    @Order(1)
    public void testReissueToken_Success_RefreshToken() throws Exception {
        Mockito.when(authService.reissueToken(refreshToken, refreshToken, TokenType.REFRESH))
                .thenReturn(refreshTokenDto);

        mockMvc.perform(get("/auth/refresh")
                        .servletPath("/auth/refresh")
                        .cookie(new Cookie("RefreshToken", refreshToken))
                        .param("type", "refresh"))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.message").value("Refresh token 발급 완료"))
                        .andExpect(jsonPath("$.statusCode").value(HttpStatus.OK.value()));

    }

    @DisplayName("엑세스 토큰 재발급")
    @Test
    @Order(2)
    public void testReissueToken_Success_AccessToken() throws Exception {
        Mockito.when(authService.reissueToken(refreshToken, accessToken, TokenType.ACCESS))
                .thenReturn(accessTokenDto);

        mockMvc.perform(get("/auth/refresh")
                        .servletPath("/auth/refresh")
                        .header("Authorization", "Bearer " + accessToken)
                        .cookie(new MockCookie("RefreshToken", refreshToken))
                        .param("type", "access"))
                        .andExpect(status().isOk())
                        .andExpect(header().string("Authorization", "Bearer " + accessTokenDto.getToken()))
                        .andExpect(jsonPath("$.message").value("Access token 발급 완료"))
                        .andExpect(jsonPath("$.statusCode").value(HttpStatus.OK.value()));
    }

    @DisplayName("토큰 타입 누락")
    @Test
    @Order(3)
    public void testReissueToken_Failure_InvalidTokenType() throws Exception {
        mockMvc.perform(get("/auth/refresh")
                        .servletPath("/auth/refresh")
                        .cookie(new MockCookie("RefreshToken", refreshToken))
                        .param("type", "invalid-type"))
                        .andExpect(status().isBadRequest())
                        .andExpect(jsonPath("$.message").value("토큰 발급 실패"))
                        .andExpect(jsonPath("$.statusCode").value(HttpStatus.BAD_REQUEST.value()));
    }

    @DisplayName("유효하지 않은 리프레시 토큰으로 재발급 요청")
    @Test
    @Order(4)
    public void testReissueToken_Failure_InvalidRefreshToken() throws Exception {
        mockMvc.perform(get("/auth/refresh")
                        .servletPath("/auth/refresh")
                        .cookie(new MockCookie("RefreshToken", "invalid-token"))
                        .param("type", "refresh"))
                        .andExpect(status().isUnauthorized())
                        .andExpect(jsonPath("$.message").value("Unauthorized"))
                        .andExpect(jsonPath("$.statusCode").value(HttpStatus.UNAUTHORIZED.value()));
    }
}
