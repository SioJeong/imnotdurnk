package com.imnotdurnk.global.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

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

        Server HTTPSServer = new Server();
        HTTPSServer.setUrl("https://i11a609.p.ssafy.io/api");
        Server HTTPServer = new Server();
        HTTPServer.setUrl("http://i11a609.p.ssafy.io:8080");
//        Server localServer = new Server();
//        localServer.setUrl("http://localhost:8080");

        return new OpenAPI()
                .components(new Components().addSecuritySchemes("Authorization", accessToken))
                .info(apiInfo())
                .servers(List.of(HTTPServer
                        ,HTTPSServer
//                        ,localServer
                ))
                .addSecurityItem(securityRequirement);
    }

    private Info apiInfo(){
        return new Info()
                .title("나안취햄ㅅ어 API")
                .description("<h3>나안취햄ㅅ어 API입니다.</h3>")
                .version("1.0.0");
    }

}