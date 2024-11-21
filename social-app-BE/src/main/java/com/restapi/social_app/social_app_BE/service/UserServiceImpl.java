package com.restapi.social_app.social_app_BE.service;


import com.restapi.social_app.social_app_BE.common.AppConstants;
import com.restapi.social_app.social_app_BE.common.UserPrincipal;
import com.restapi.social_app.social_app_BE.dto.SignupDto;
import com.restapi.social_app.social_app_BE.entity.User;
import com.restapi.social_app.social_app_BE.enumeration.Role;
import com.restapi.social_app.social_app_BE.exception.EmailExistsException;
import com.restapi.social_app.social_app_BE.exception.UserNotFoundException;
import com.restapi.social_app.social_app_BE.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final JwtTokenService jwtTokenService;

    @Override
    public User createNewUser(SignupDto signupDto) {
        try {
            User user = getUserByEmail(signupDto.getEmail());
            if (user != null) {
                throw new EmailExistsException();
            }

        }
        catch (UserNotFoundException userNotFoundException) {
            User newUser = new User();
            newUser.setEmail(signupDto.getEmail());
            newUser.setPassword(passwordEncoder.encode(signupDto.getPassword()));
            newUser.setFirstName(signupDto.getFirstName());
            newUser.setLastName(signupDto.getLastName());
            newUser.setFollowersCount(0);
            newUser.setFollowingCount(0);
            newUser.setEnabled(true);
            newUser.setAccountVerified(false);
            newUser.setEmailVerified(false);
            newUser.setJoinDate(new Date());
            newUser.setDateLastModified(new Date());
            newUser.setRole(Role.ROLE_USER.name());
            User savedUser = userRepository.save(newUser);
            System.out.println(savedUser);
            UserPrincipal userPrincipal = new UserPrincipal(savedUser);
            String emailVerifyMail =
                    emailService.buildEmailVerifyMail(jwtTokenService.generateToken(userPrincipal));
            emailService.send(savedUser.getEmail(), AppConstants.VERIFY_EMAIL, emailVerifyMail);

            return savedUser;
        }
        return null;

    }

    @Override
    public User getUserByEmail(String email) {
//        return userRepository.findByEmail(email).orElseThrow(() ->
//                new UserNotFoundException("No user found with this email."));
        return userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
    }


}


