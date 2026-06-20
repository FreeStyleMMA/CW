package com.coffeewriter.member;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {
	  
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public void signup(SignupRequestDTO request){

//        if(memberRepository.existsByEmail(
//                request.getEmail())){
//            throw new IllegalArgumentException(
//                    "이미 존재하는 이메일");
//        }

        Member member = Member.builder() // member 생성
                .email(request.getEmail())
                .password(
                    passwordEncoder.encode(
                        request.getPassword()))
                .nickname(request.getNickname())
                .role(Role.ROLE_USER)
                .memberId(request.getMemberId())
                .build();
System.out.println("요청 이메일: "+request.getEmail());
System.out.println("요청비번: "+request.getPassword());
System.out.println("요청닉네임: "+request.getNickname());
System.out.println("요청아이디: "+request.getMemberId());
        memberRepository.save(member);
    }
}
