import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserLogin } from '../../model/user-login';
import { AuthService } from '../../service/auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { User } from '../../model/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginFormGroup!: FormGroup;
  submittingForm: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private matSnackbar: MatSnackBar,
		private matDialog: MatDialog
  ) {

  }

  getEmail() { return this.loginFormGroup.get('email') }
  getPassword() { return this.loginFormGroup.get('password') }

  ngOnInit(): void {

    this.loginFormGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32)])
    })

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  login(): void {
    debugger;
    if (this.loginFormGroup.valid) {
      this.submittingForm = true;
      const userLoginDetails = new UserLogin();
      userLoginDetails.email = this.getEmail().value;
      userLoginDetails.password = this.getPassword().value;
      console.log(userLoginDetails);
      debugger;
      this.subscriptions.push(
        this.authService.login(userLoginDetails).subscribe({
          next: (response: HttpResponse<User>) => {
            const authToken = response.headers.get('Jwt-Token');
            this.authService.storeTokenInCache(authToken);
            this.authService.storeUserDetailsInCache(response.body);
            this.submittingForm = false;
            this.router.navigateByUrl('/profile');
          },
          error: (errorRes: HttpErrorResponse) => {
            const validationErrors = errorRes.error.validationErrors;
            if (validationErrors != null) {
              Object.keys(validationErrors).forEach(key => {
                const formControl = this.loginFormGroup.get(key);
                if (formControl) {
                  formControl.setErrors({
                    serverError: validationErrors[key]
                  });
                }
              });
            }
            else {
              this.matSnackbar.openFromComponent(SnackbarComponent, {
								data: 'Incorrect email or password.',
								panelClass: ['bg-danger'],
								duration: 5000
							});
              this.submittingForm = false;
            }
          }

        })
      )


    }

  }

  openForgotPasswordDialog(event: any) {
    event.preventDefault();
    this.matDialog.open(ForgotPasswordDialogComponent, {
      autoFocus: true,
      width: '500px',
      height: 'auto'
    })
  }


}
