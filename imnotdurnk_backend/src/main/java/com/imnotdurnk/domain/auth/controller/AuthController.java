package com.imnotdurnk.domain.auth.controller;

import com.imnotdurnk.domain.auth.dto.TokenDto;
import com.imnotdurnk.domain.auth.enums.TokenType;
import com.imnotdurnk.domain.auth.service.AuthService;
import com.imnotdurnk.global.commonClass.CommonResponse;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);
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
    public ResponseEntity<CommonResponse> reissuedToken(
            @RequestAttribute(value = "RefreshToken", required = true) String refreshToken,
            @RequestAttribute(value = "AccessToken", required = false) String accessToken,
            @RequestParam String type) throws BadRequestException {

        if (type == null || type.equals("")) {
            throw new BadRequestException("타입이 명시되지 않음");
        }

        CommonResponse response = new CommonResponse();
        TokenType tokenType = TokenType.ACCESS;

        if (type.equals("refresh")) {
            tokenType = TokenType.REFRESH;

            TokenDto refreshTokenDto = authService.reissueToken(refreshToken, refreshToken, tokenType);

            long maxAge = (refreshTokenDto.getExpirationTime() - refreshTokenDto.getIssuedAt()) / 1000;

            ResponseCookie responseCookie = ResponseCookie
                    .from("RefreshToken", refreshTokenDto.getToken())
                    .domain("i11a609.p.ssafy.io")
                    .path("/")
                    .httpOnly(true)
                    .secure(true)
                    .maxAge(maxAge)
                    .sameSite("None")
                    .build();

            response.setStatusCode(HttpStatus.OK.value());
            response.setMessage("Refresh token 발급 완료");
            return ResponseEntity.status(response.getStatusCode())
                    .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                    .body(response);
        }

        if (type.equals("access")) {
            tokenType = TokenType.ACCESS;

            TokenDto accessTokenDto = authService.reissueToken(refreshToken, accessToken, tokenType);
            response.setStatusCode(HttpStatus.OK.value());
            response.setMessage("Access token 발급 완료");
            log.info("기존 access token: " + accessToken);
            log.info("재발급된 access token: " + accessTokenDto.getToken());
            return ResponseEntity.status(response.getHttpStatus())
                    .header("Authorization", "Bearer " + accessTokenDto.getToken())
                    .body(response);
        }

        response.setStatusCode(HttpStatus.BAD_REQUEST.value());
        response.setMessage("토큰 발급 실패");
        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

}