package com.imnotdurnk.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyEmailDto {
    private String email;
    private String verifyCode;
    public VerifyEmailDto() {}

    public VerifyEmailDto(String email, String verifyCode) {
        this.email = email;
        this.verifyCode = verifyCode;
    }
}
