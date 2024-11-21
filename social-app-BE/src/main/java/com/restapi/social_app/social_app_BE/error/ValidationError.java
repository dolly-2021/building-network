package com.restapi.social_app.social_app_BE.error;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class ValidationError {
    private String code;
    private String message;
}

