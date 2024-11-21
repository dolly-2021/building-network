package com.restapi.social_app.social_app_BE.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.hibernate.cfg.Environment;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    private Environment environment;
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmailId;

    @Override @Async
    public void send(String to, String subject, String content) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, "UTF-8");
            messageHelper.setFrom(fromEmailId);
            messageHelper.setText(content, true);
            messageHelper.setTo(to);
            messageHelper.setSubject(subject);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new IllegalStateException("Failed to send email");
        }
    }

    @Override
    public String buildEmailVerifyMail(String token) {
        String url = "http://localhost:4200" + "/verify-email/" + token;
        return buildEmailBody(
                url,
                "Verify Email Address",
                "Please, click on the link below to verify your email address.",
                "Click to Verify"
        );
    }

    private String buildEmailBody(String url, String emailBodyHeader, String emailBodyDetail, String buttonText) {
        return "<div style=\"margin: 0 auto; width: 500px; text-align: center; background: #ffffff; border-radius: 5px; border: 3px solid #838383;\">" +
                "<h2 style=\"background: #838383; padding: 15px; margin: 0; font-weight: 700; font-size: 24px; color: #ffffff;\">" + emailBodyHeader + "</h2>" +
                "<p style=\"padding: 20px; font-size: 20px; color: #202020;\">" + emailBodyDetail + "</p>" +
                "<a style=\"display: inline-block; padding: 10px 20px; margin-bottom: 30px; text-decoration: none; background: #3f51b5; font-size: 16px; border-radius: 3px; color: #ffffff;\" href=\" " + url + " \">" + buttonText + "</a>" +
                "</div>";
    }

    @Override
    public String buildResetPasswordMail(String token) {
        return "";
    }
}
