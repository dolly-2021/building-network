import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { ConfirmPasswordMatcher } from '../../shared/confirm-password-matcher';
import { UserSignup } from '../../model/user-signup';
import { AuthService } from '../../service/auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { User } from '../../model/user';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { Router } from '@angular/router';
import { AppConstants } from '../../shared/app-constant';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit, OnDestroy {
  confirmPasswordMatcher = new ConfirmPasswordMatcher();
  signupForm!: FormGroup
  submittingForm: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, 
    private router: Router, private matSnackbar: MatSnackBar) {

  }

  ngOnInit() {

    this.signupForm = this.formBuilder.group({
      userInfoGroup: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.maxLength(24)]),
        lastName: new FormControl('', [Validators.required, Validators.maxLength(24)]),
        email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(25)])
      }),
      passwordGroup: this.formBuilder.group({
        password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]),
        confirmPassword: new FormControl('', [Validators.required])
      })
    }, { validators: this.matchPasswords });

  }

  ngOnDestroy(): void {

  }

  get firstName() { return this.signupForm.get('userInfoGroup.firstName') }
  get lastName() { return this.signupForm.get('userInfoGroup.lastName') }
  get email() { return this.signupForm.get('userInfoGroup.email') }
  get password() { return this.signupForm.get('passwordGroup.password') }
  get confirmPassword() { return this.signupForm.get('passwordGroup.confirmPassword') }

  matchPasswords: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
    const passwordGroup = group.get('passwordGroup') as FormGroup;
    const password = passwordGroup.get('password')?.value;
    const confirmPassword = passwordGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMissMatch: true }
  }

  signup() {
    if (this.signupForm.valid) {
			this.submittingForm = true;
			const userSignup = new UserSignup();
			userSignup.firstName = this.firstName?.value;
			userSignup.lastName = this.lastName?.value;
			userSignup.email = this.email?.value;
			userSignup.password = this.password?.value;
			userSignup.confirmPassword = this.confirmPassword?.value;

			this.subscriptions.push(
				this.authService.signup(userSignup).subscribe({
					next: (response: HttpResponse<User>) => {
						localStorage.setItem(AppConstants.messageTypeLabel, AppConstants.successLabel);
						localStorage.setItem(AppConstants.messageHeaderLabel, AppConstants.signupSuccessHeader);
						localStorage.setItem(AppConstants.messageDetailLabel, AppConstants.signupSuccessDetail);
						localStorage.setItem(AppConstants.toLoginLabel, AppConstants.trueLabel);
						this.submittingForm = false;
						this.router.navigateByUrl('/message');
					},
					error: (errorResponse: HttpErrorResponse) => {
						const validationErrors = errorResponse.error.validationErrors;
						if (validationErrors != null) {
							Object.keys(validationErrors).forEach(key => {
								let formGroup = 'infoGroup';
								if (key === 'password' || key === 'passwordRepeat') formGroup = 'passwordGroup';
								const formControl = this.signupForm.get(`${formGroup}.${key}`);
								if (formControl) {
									formControl.setErrors({
										serverError: validationErrors[key]
									});
								}
							})
						} else {
							this.matSnackbar.openFromComponent(SnackbarComponent, {
								data: AppConstants.snackbarErrorContent,
								panelClass: ['bg-danger'],
								duration: 5000
							});
						}
						this.submittingForm = false;
					}
				})
			);
		}

  }


}
