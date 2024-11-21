import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { AppConstants } from '../../shared/app-constant';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrl: './forgot-password-dialog.component.css'
})
export class ForgotPasswordDialogComponent implements OnInit, OnDestroy {

  forgotPasswordFormGroup: FormGroup;
  spinnerSurfing: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder, private matSnackbar: MatSnackBar,
    private router: Router, private userService: UserService, private dialogRef: MatDialogRef<ForgotPasswordDialogComponent>) { }

  get email() { return this.forgotPasswordFormGroup.get('email'); }


  ngOnInit(): void {
    this.forgotPasswordFormGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(64)])
    })

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  submitForgotPasswordForm() {
    if (this.forgotPasswordFormGroup.valid) {
      if (!this.spinnerSurfing) {
        this.spinnerSurfing = true;
        this.subscriptions.push(
          this.userService.forgotPassword(this.email.value).subscribe({
            next: (result: any) => {
              localStorage.setItem(AppConstants.messageTypeLabel, AppConstants.successLabel);
              localStorage.setItem(AppConstants.messageHeaderLabel, AppConstants.forgotPasswordSuccessHeader);
              localStorage.setItem(AppConstants.messageDetailLabel, AppConstants.forgotPasswordSuccessDetail);
              localStorage.setItem(AppConstants.toLoginLabel, AppConstants.falseLabel);
              this.spinnerSurfing = false;
              this.dialogRef.close();
              this.router.navigateByUrl('/message');
            },
            error: (errorResponse: HttpErrorResponse) => {
              this.spinnerSurfing = false;
              this.matSnackbar.openFromComponent(SnackbarComponent, {
                data: AppConstants.snackbarErrorContent,
                panelClass: ['bg-danger'],
                duration: 5000
              });
            }
          })
        );
      }
    }
  }


}
