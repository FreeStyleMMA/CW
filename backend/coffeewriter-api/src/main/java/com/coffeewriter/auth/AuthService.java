package com.coffeewriter.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.coffeewriter.member.Member;
import com.coffeewriter.member.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    
    public TokenResponse login(LoginRequestDTO request) {

        Member member = memberRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("회원이 존재하지 않습니다."));

        if (!passwordEncoder.matches(
                request.getPassword(),
                member.getPassword())) {

            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        String token =
                jwtProvider.createToken(member.getId());

        return new TokenResponse(token);
    }
}

