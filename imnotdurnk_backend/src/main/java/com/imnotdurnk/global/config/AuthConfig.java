package com.imnotdurnk.global.config;

import com.imnotdurnk.global.interceptor.JwtInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AuthConfig implements WebMvcConfigurer {

    private final JwtInterceptor jwtTokenInterceptor;

    public AuthConfig(JwtInterceptor jwtTokenInterceptor) {
        this.jwtTokenInterceptor = jwtTokenInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        /**
         * 토큰 인증에서 제외
         * 1. 로그인
         * 2. 로그아웃
         * 3. 회원가입
         * 4. Swagger UI
         * 5. 발음 평가 요청 API
         */
        registry.addInterceptor(jwtTokenInterceptor)
                .excludePathPatterns(
                        "/v3/api-docs/**", "/swagger-ui/**", "/swagger-resources/**", "/webjars/**",
                        "/users/login/**", //로그인
                        "/users/signup/**", //회원가입
                        "/map/**",
                        "/voice/pronounce", //발음 평가 요청
                        "/game-logs/question", //게임용 랜덤 문장 제공
                        "/voice/pronounce/not-save" //발음 평가 저장하지 않음
                        );
    }
}
