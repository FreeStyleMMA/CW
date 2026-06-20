package com.coffeewriter.auth;

import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;


@Component
public class JwtProvider {

    private final String SECRET_KEY =
            "coffeewriter-secret-key";

    public String createToken(Long memberId) {

        Date now = new Date();

        return Jwts.builder()
                .subject(memberId.toString()) // 초기 개발 버전 토큰 정보에 memberId만
                .issuedAt(now)
                .expiration(
                        new Date(
                                now.getTime() + 1000 * 60 * 60
                        )
                )
                .signWith(
                        Keys.hmacShaKeyFor(
                                SECRET_KEY.getBytes()
                        )
                )
                .compact();
    }
}