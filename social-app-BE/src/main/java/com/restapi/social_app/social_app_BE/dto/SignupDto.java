package com.restapi.social_app.social_app_BE.dto;



import com.restapi.social_app.social_app_BE.annotation.PasswordMatch;
import com.restapi.social_app.social_app_BE.annotation.ValidEmail;
import com.restapi.social_app.social_app_BE.annotation.ValidPassword;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@PasswordMatch(passwordFieldFirst = "password", passwordFieldSecond = "confirmPassword")
public class SignupDto {
	
	@Size(max=30)
	private String firstName;
	@Size(max=30)
	private String lastName;
	@ValidEmail
	private String email;
	@ValidPassword
	private String password;
	private String confirmPassword;

}
