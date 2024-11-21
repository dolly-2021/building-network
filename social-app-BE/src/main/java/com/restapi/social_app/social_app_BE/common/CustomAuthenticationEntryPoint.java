package com.restapi.social_app.social_app_BE.common;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.restapi.social_app.social_app_BE.response.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;

@Component
public class CustomAuthenticationEntryPoint extends Http403ForbiddenEntryPoint {

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException exception) throws IOException {
        ErrorResponse errorResponse = ErrorResponse.builder().
                statusCode(HttpStatus.FORBIDDEN.value())
                .status(HttpStatus.FORBIDDEN)
                .message(AppConstants.FORBIDDEN)
                .reason(HttpStatus.FORBIDDEN.getReasonPhrase())
                .timestamp(new Date())
                .build();
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.FORBIDDEN.value());
        OutputStream outputStream = response.getOutputStream();
        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(outputStream, errorResponse);
        outputStream.flush();
    }
}
