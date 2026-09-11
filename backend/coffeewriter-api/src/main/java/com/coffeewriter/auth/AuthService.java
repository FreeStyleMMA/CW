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
    
    public String login(LoginRequestDTO request) {

        Member member = memberRepository.findByMemberId(request.getMemberId())
                .orElseThrow(() ->
                        new RuntimeException("회원이 존재하지 않습니다."));

        if (!passwordEncoder.matches(
                request.getPassword(),
                member.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        return jwtProvider.createToken(
        		member.getId(),
        		member.getNickname(),
                member.getMemberId(),
                member.getRole()
        );
    }
    
    public MemberDTO getMemberInfo(Long id) {

        Member member = memberRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("회원 정보를 찾을 수 없습니다.")
                );

        return MemberDTO.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .role(member.getRole())
                .build();
    }
}

