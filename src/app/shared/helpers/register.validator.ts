import { ValidatorFn, AbstractControl } from '@angular/forms';

/**
 * Confirm password custom validator
 * https://angular.io/guide/form-validation#custom-validators
 * https://scotch.io/@ibrahimalsurkhi/match-password-validation-with-angular-2
 */
export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirm_password');
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMatch: true});
    } else {
      return null;
    }
  };
}
