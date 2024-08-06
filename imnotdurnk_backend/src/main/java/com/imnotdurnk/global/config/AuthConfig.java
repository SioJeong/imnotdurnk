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
         */
        registry.addInterceptor(jwtTokenInterceptor)
                .excludePathPatterns("/users/login", "/users/signup/**","/users/signup/verify","/users/signup",
                        "/v3/api-docs/**", "/swagger-ui/**", "/swagger-resources/**",
		       	"/webjars/**",
                        "/users/login/find-password");
    }
}
