package com.coffeewriter.auth;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    public JwtFilter(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // 1. Cookie에서 JWT 추출
        String token = jwtProvider.resolveToken(request);

        // 2. JWT가 존재하고 유효하면
        if (token != null && jwtProvider.validateToken(token)) {

            // 3. JWT에서 Authentication 생성
            Authentication authentication =
                    jwtProvider.getAuthentication(token);

            // 4. Spring Security에 인증 정보 등록
            SecurityContextHolder
                    .getContext()
                    .setAuthentication(authentication);
        }

        // 5. 다음 필터로 진행
        filterChain.doFilter(request, response);
    }
}