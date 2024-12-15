package com.SI.SI.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Applique CORS à tous les endpoints API
                .allowedOrigins("http://localhost:4200") // Autorise votre frontend Angular
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Autorise les méthodes HTTP nécessaires
                .allowedHeaders("*") // Autorise tous les headers
                .allowCredentials(true); // Si vous utilisez des cookies ou des autorisations spécifiques
    }
}