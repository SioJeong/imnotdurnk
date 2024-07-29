package com.imnotdurnk.global.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI(){

        SecurityScheme accessToken = new SecurityScheme()
                .type(SecurityScheme.Type.APIKEY)
                .in(SecurityScheme.In.HEADER)
                .name("Authorization");

        SecurityRequirement securityRequirement = new SecurityRequirement()
                .addList("Authorization");

        return new OpenAPI()
                .components(new Components().addSecuritySchemes("Authorization", accessToken))
                .info(apiInfo())
                .addSecurityItem(securityRequirement);
    }

    private Info apiInfo(){
        return new Info()
                .title("나안취햄ㅅ어 API")
                .description("<h3>나안취햄ㅅ어 API입니다.</h3>")
                .version("1.0.0");
    }

}