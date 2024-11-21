package com.restapi.social_app.social_app_BE.repository;


import com.restapi.social_app.social_app_BE.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

}
