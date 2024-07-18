package com.imnotdurnk.domain.auth.controller;

import com.imnotdurnk.domain.auth.dto.TokenDto;
import com.imnotdurnk.domain.auth.dto.TokenResponseDto;
import com.imnotdurnk.domain.auth.enums.TokenType;
import com.imnotdurnk.domain.auth.service.AuthService;
import com.imnotdurnk.global.util.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 *
 * AuthController
 * 사용자 인증 관련을 전담하는 컨트롤러
 *
 */

@RestController
@AllArgsConstructor
public class AuthController {
    private final JwtUtil jwtUtil;
    private final AuthService authService;


    /**
     *
     * 토큰 재발급
     * @param refreshToken
     * @param accessToken
     * @param type
     * @return 재발급 완료 여부 (토큰은 헤더에 넣어서 전송)
     */
    @GetMapping("/refresh")
    public ResponseEntity<?> reissuedToken(
            @RequestAttribute(value = "RefreshToken", required = false) String refreshToken,
            @RequestAttribute(value = "AccessToken", required = false) String accessToken,
            @RequestParam String type) {

        TokenType tokenType = TokenType.ACCESS;
        if (type.equals("refresh")) {
            tokenType = TokenType.REFRESH;

            TokenDto refreshTokenDto = authService.reissueToken(refreshToken, refreshToken, tokenType);

            long maxAge = (refreshTokenDto.getExpirationTime() - refreshTokenDto.getIssuedAt()) / 1000;

            ResponseCookie responseCookie = ResponseCookie
                    .from("RefreshToken", refreshTokenDto.getToken())
                    .domain("localhost")
                    .path("/")
                    .httpOnly(true)
                    .secure(true)
                    .maxAge(maxAge)
                    .sameSite("None")
                    .build();

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, responseCookie.toString()).build();
        }

        if (type.equals("access")) {
            tokenType = TokenType.ACCESS;

            TokenDto accessTokenDto = authService.reissueToken(refreshToken, accessToken, tokenType);

            return ResponseEntity.ok()
                    .header("Authorization", "Bearer " + accessTokenDto.getToken()).build();
        }

        return ResponseEntity.badRequest().build();

    }
}