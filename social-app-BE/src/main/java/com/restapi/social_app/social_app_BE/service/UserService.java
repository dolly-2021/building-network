package com.restapi.social_app.social_app_BE.service;


import com.restapi.social_app.social_app_BE.dto.SignupDto;
import com.restapi.social_app.social_app_BE.entity.User;

public interface UserService {

	User createNewUser(SignupDto signupDto) ;
	User getUserByEmail(String email);




}
