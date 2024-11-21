package com.restapi.social_app.social_app_BE.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


import com.restapi.social_app.social_app_BE.validator.PasswordMatchValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ElementType.TYPE, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PasswordMatchValidator.class)
public @interface PasswordMatch {
	String message() default "Password mismatch";
    String passwordFieldFirst();
    String passwordFieldSecond();
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
