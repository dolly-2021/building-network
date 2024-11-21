package com.restapi.social_app.social_app_BE.dto;

import com.restapi.social_app.social_app_BE.annotation.ValidEmail;
import com.restapi.social_app.social_app_BE.annotation.ValidPassword;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class LoginDto {

    @ValidEmail
    private String email;
    @ValidPassword
    private String password;
}
