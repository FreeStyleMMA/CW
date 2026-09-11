package com.coffeewriter.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.coffeewriter.auth.JwtFilter;
import com.coffeewriter.auth.JwtProvider;

@Configuration
@EnableWebSecurity

public class SecurityConfig {

    private final JwtProvider jwtProvider;

    public SecurityConfig(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

	http
	    .csrf(csrf -> csrf.disable())
	    .authorizeHttpRequests(auth -> auth
	
	        .requestMatchers(
	            "/api/auth"
	        ).permitAll()
	
	        .requestMatchers(
	            "/api/recipe/**"
	        ).authenticated()
	
	        .requestMatchers(
	            "/api/admin/**",
	            "/countries/**",
	            "/api/roastery/**"
	        ).hasRole("ADMIN")
	
	        .anyRequest().permitAll()
	            
	        )

        .addFilterBefore(
            new JwtFilter(jwtProvider),
            UsernamePasswordAuthenticationFilter.class
        );

    return http.build();
}

@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}
}