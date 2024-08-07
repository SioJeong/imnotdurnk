package com.imnotdurnk.global.interceptor;

import com.imnotdurnk.domain.auth.enums.TokenType;
import com.imnotdurnk.domain.auth.service.AuthService;
import com.imnotdurnk.global.exception.InvalidTokenException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@AllArgsConstructor
public class JwtInterceptor implements HandlerInterceptor {

    private static final Logger log = LoggerFactory.getLogger(JwtInterceptor.class);
    private final AuthService authService;



    /***
     * 쿠키 리스트 내에 refresh token 존재 여부 및 유효성 검증
     * @param request
     * @return refresh token 검증 결과
     * @throws InvalidTokenException
     */
    private boolean checkRefreshToken(HttpServletRequest request) throws InvalidTokenException {

        Cookie[] cookies = request.getCookies();
        log.info("리프레시 토큰 체크: " + request.getCookies() == null ? "null" : request.getCookies()[0].getValue());

        // 쿠키에서 Refresh Token 탐색 후 존재하면 유효성 검증
        for(Cookie cookie : cookies) {
            //쿠키 이름이 RefreshToken이 아니면 다음 쿠키로 넘어감
            if(!cookie.getName().equals("RefreshToken")) {
                continue;
            }

            //쿠키에서 refresh token을 가져옴
            String refreshToken = cookie.getValue();

            // refresh token이 유효한 경우
            if(authService.isTokenValid(refreshToken, TokenType.REFRESH)) {
                request.setAttribute("RefreshToken", refreshToken);
                return true;
            }
            // refresh token이 쿠키 내에 있지만 검증이 되지 않은 경우
            break;
        }
        return false;

    }

    /***
     * authorization 문자열을 받아서 access token을 자르고 유효성 검증
     * @param request
     * @return access token 검증 결과
     * @throws InvalidTokenException
     */
    private boolean checkAccessToken(HttpServletRequest request) throws InvalidTokenException {

        // 헤더에 Authorization 존재 여부 확인
        if(request.getHeader("Authorization") != null) {
            String authorization = request.getHeader("Authorization");
            String accessToken = null; //access token을 저장할 string 변수

            // "Bearer "로 시작하는 부분을 가져와서 access token 부분만 잘라냄
            if(authorization != null && authorization.startsWith("Bearer ")) {
                accessToken = authorization.substring("Bearer ".length());
            }

            // 가져온 access Token의 검증이 완료된 경우
            if(authService.isTokenValid(accessToken, TokenType.ACCESS)) {
//                log.info("access token 검증 완료: " + accessToken);
                request.setAttribute("AccessToken", accessToken);
                return true;
            }
        }

        //헤더에 Authorization이 존재하지 않거나 access token 검증이 되지 않은 경우
        return false;
    }


    /***
     * 인증이 필요한 요청에서 access token의 유효성을 검증
     * 토큰 재발급 요청 시 refresh token의 유효성 검증
     * controller 단에서 token을 바로 사용할 수 있도록 전처리 (헤더로 받아온 토큰들을 attribute로 세팅함)
     * @param request
     * @param response
     * @param handler
     * @return 검증 결과
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws InvalidTokenException {

    	/**
    	 * 로그아웃인 경우 유효성 검증 후 유효한 토큰만 attribute로 설정
    	 */
    	if(request.getServletPath().equals("/users/logout")) {
    		checkRefreshToken(request);
    		checkAccessToken(request);
    		return true;
    	}

    	/**
    	 * 토큰 재발급 요청인 경우 Refresh Token 유효성 검증 및 attribute 설정
    	 */
    	else if(request.getServletPath().equals("/auth/refresh")) {
            //리프레시 토큰 확인
            if(!checkRefreshToken(request))
                throw new InvalidTokenException("[인터셉터] 유효하지 않은 리프레시 토큰");
            
            checkAccessToken(request);
    	}
        /**
         * 회원 탈퇴시 리프레시 토큰 확인 필요 (redis에서 삭제하기 위해)
         */
        else if(request.getServletPath().equals("/users/delete-account")){
            if(checkRefreshToken((request)) && checkAccessToken(request))
                return true;
            else throw new InvalidTokenException("[인터셉터] 유효하지 않은 토큰");
        }

    	/**
    	 * Access Token 유효성 검증 및 attribute 설정
    	 */
    	else {
    		if(!checkAccessToken(request))
                throw new InvalidTokenException("[인터셉터] 유효하지 않은 엑세스 토큰");
    	}

        return true;
    }

}
