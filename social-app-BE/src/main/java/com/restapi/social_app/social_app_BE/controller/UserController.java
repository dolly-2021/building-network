package com.restapi.social_app.social_app_BE.controller;

import com.restapi.social_app.social_app_BE.common.AppConstants;
import com.restapi.social_app.social_app_BE.common.UserPrincipal;
import com.restapi.social_app.social_app_BE.dto.LoginDto;
import com.restapi.social_app.social_app_BE.dto.SignupDto;
import com.restapi.social_app.social_app_BE.entity.User;
import com.restapi.social_app.social_app_BE.service.JwtTokenService;
import com.restapi.social_app.social_app_BE.service.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserController {

	private final JwtTokenService jwtTokenService;
	private final UserService userService;
	private final AuthenticationManager authenticationManager;

	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody SignupDto signupDto) {
		User user = userService.createNewUser(signupDto);
		return new ResponseEntity<>(user, HttpStatus.CREATED);
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken
				(loginDto.getEmail(), loginDto.getPassword()));
		User loggedInUser = userService.getUserByEmail(loginDto.getEmail());
		UserPrincipal userPrincipal = new UserPrincipal(loggedInUser);
		HttpHeaders headers = new HttpHeaders();
		headers.add(AppConstants.TOKEN_HEADER,jwtTokenService.generateToken(userPrincipal));
		return new ResponseEntity<>(loggedInUser, headers, HttpStatus.OK);
	}
}