package com.coffeewriter.auth;

import com.coffeewriter.member.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class MemberDTO {

    private Long id;

    private String memberId;
    
    private String email;

    private String nickname;
    
    private Role role;
}