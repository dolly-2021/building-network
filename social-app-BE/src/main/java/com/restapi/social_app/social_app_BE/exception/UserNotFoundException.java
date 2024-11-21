package com.restapi.social_app.social_app_BE.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException() {}
    public UserNotFoundException(String message) {
        super(message);
    }
}
