package com.restapi.social_app.social_app_BE.service;

import com.restapi.social_app.social_app_BE.common.UserPrincipal;
import com.restapi.social_app.social_app_BE.entity.User;
import com.restapi.social_app.social_app_BE.exception.UserNotFoundException;
import com.restapi.social_app.social_app_BE.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new UserNotFoundException("No user exists with this email.");
        } else {
            return new UserPrincipal(user.get());
        }
    }
}
