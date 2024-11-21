import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class ConfirmPasswordMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): any {
        const passwordControl = control?.parent?.get('password');
        const confirmPasswordControl = control?.parent?.get('confirmPassword');
        return control && control.parent && passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value && control.dirty;
    }
}  
