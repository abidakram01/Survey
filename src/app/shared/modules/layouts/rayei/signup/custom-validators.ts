import { ValidationErrors, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';

/**
 * Confirm password custom validator
 * https://angular.io/guide/form-validation#custom-validators
 * https://scotch.io/@ibrahimalsurkhi/match-password-validation-with-angular-2
 */
export class CustomValidators {
    static passwordMatchValidator(control: FormGroup) {
        const password: string = control.controls['password'].value; // get password from our password form control
        const confirmPassword: string = control.controls['confirm_password'].value; // get password from our confirmPassword form control
        // compare is the password math
        if (password !== confirmPassword) {
          // if they don't match, set an error in our confirmPassword form control
          control.controls['confirm_password'].setErrors({ NoPassswordMatch: true });
        }
      }
}
