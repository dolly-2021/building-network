package com.restapi.social_app.social_app_BE.exception;

public class EmailExistsException extends RuntimeException{

    public EmailExistsException() {
    }

    public EmailExistsException(String message) {
        super(message);
    }
}
