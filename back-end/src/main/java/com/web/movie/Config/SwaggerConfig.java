package com.web.movie.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI custOpenAPI(){
        return new OpenAPI()
                        .info(new Info().title("Authentication"))
                        .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                        .components(new Components().addSecuritySchemes("bearerAuth",new SecurityScheme()
                        .name("def").type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("Bearer")));
    }
}
