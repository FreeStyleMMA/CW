package com.coffeewriter.member;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
@CrossOrigin(origins = "http://localhost:5173") // 추후 전역설정으로 변경

public class MemberController {   

    private final MemberService memberService;

    @PostMapping("/register")
    public ResponseEntity<Void> signup(
            @RequestBody SignupRequestDTO request){

        memberService.signup(request);
       
        System.out.println("로그인 요청:" + request);
        
        return ResponseEntity.ok().build();
        
    }
}