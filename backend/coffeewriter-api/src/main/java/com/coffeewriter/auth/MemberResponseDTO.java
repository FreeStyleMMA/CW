package com.coffeewriter.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberResponseDTO {

    private Long id;

    private String email;

    private String nickname;
}