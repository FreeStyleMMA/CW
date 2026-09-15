package com.coffeewriter.auth;

import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.coffeewriter.member.Role;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;


@Component
public class JwtProvider {

    
	private final SecretKey key;

    public JwtProvider(
            @Value("${JWT_SECRET}") String secret
    ) {
        this.key = Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8)
        );
    }
    
    public String createToken(Long id, String memberId, String nickname, Role role ) {
    	
        Date now = new Date();

        return Jwts.builder()
                .subject(id.toString()) // 초기 개발 버전 토큰 정보에 memberId만\
                .claim(nickname, now)
                .claim(memberId, now)
                .claim("role", role)
                .issuedAt(now)
                .expiration(
                        new Date(now.getTime() + 1000 * 60 * 60)
                )
                .signWith(key)
                .compact();
    }
    
    // token 읽어주기
    public String resolveToken(HttpServletRequest request) {

        if (request.getCookies() == null) {
            return null;
        }

        for (Cookie cookie : request.getCookies()) {

            if ("accessToken".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }

        return null;
    }
    
    // token 검증
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
    
    //JWT에서 memberId 추출
    public String getMemberId(String token) {

        return Jwts.parser()
                .verifyWith(key)                               
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
    
    public Authentication getAuthentication(String token) {

        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        String memberId = claims.getSubject();
        String role = claims.get("role", String.class);

        return new UsernamePasswordAuthenticationToken(
                memberId,
                null,
                Collections.singletonList(
                        new SimpleGrantedAuthority("ROLE_" + role)
                )
        );
    }
    

}