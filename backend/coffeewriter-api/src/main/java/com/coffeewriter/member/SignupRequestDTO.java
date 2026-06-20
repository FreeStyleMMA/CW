package com.coffeewriter.member;

import lombok.Getter;

@Getter

public class SignupRequestDTO {

    private String email;

    private String password;

    private String nickname;
    
    private String memberId;
    
}