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
@RequestMapping("/api/members")
@CrossOrigin(
	    origins = {
	        "http://localhost:3000",
	        "http://localhost:5173",
	        "http://localhost"
	    },
	    allowCredentials = "true"
	)
public class MemberController {   

    private final MemberService memberService;

    @PostMapping("/register")
    public ResponseEntity<Void> signup(
            @RequestBody SignupRequestDTO request){
    	 System.out.println("회원가입 Controller 진입");
    	    System.out.println("회원 ID: " + request.getMemberId());
        memberService.signup(request);
       
        return ResponseEntity.ok().build();
        
    }
}