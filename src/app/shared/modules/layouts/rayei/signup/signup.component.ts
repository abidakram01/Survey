import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationService } from 'src/app/shared/services/registration.service';
import { IResponse } from 'src/app/shared/interfaces/IResponse';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

const DEFAULT_ALERT_TIMEOUT = 3000; // expire message after 3 seconds.

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private _success = new Subject<string>();
  staticAlertClosed = false;
  hasServerError = false;

  successMessage: string;
  get tc_agree() { return this.signupForm.get('tc_agree'); }
  get email() { return this.signupForm.get('email') as FormControl; }
  get password() { return this.signupForm.get('password'); }
  // get user_type() { return this.signupForm.get('user_type') as FormControl; }



  constructor(private registrationService: RegistrationService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.signupForm = this.createSignupForm();
  }

  // Property to switch the Account(login/singup) modal tabs
  @Input()
  selected: string;

  // To hide/show password
  showPassword = false;
  serverError: string;

  public submitted = false;

  public registrationStatus = false;

  public signupForm: FormGroup;

  // public type :any= 'user';



  /**n
   * To hide/show password
   */
  public passwordType = 'password';
  public eyeImage = 'fa-eye-slash';

  // public captchaSiteKey = '6Lfbi5EUAAAAAE7Fy3A6Lnu9RYNN-vPN1bbMsHRZ';
  // public captchaSiteKey = '6Lfy6pEUAAAAAGtoUAtD5kJ8MSkA9QpL3xJZI8Kt';
  //public captchaSiteKey = '6Lf9rJwUAAAAAKr--tgcESt-UHbhg6wsqkbXP5nX';
  public captchaSiteKey = '6LdArrQUAAAAAImjpxBOfEXA6w_4Gy4ePWb5RM4I';
  private captchaSuccess = false;
  public captchaError = false;

  /**
   * Method gets the singup form group object
   */
  public createSignupForm(): FormGroup {
    return this.fb.group({
      email: new FormControl('', [
        Validators.required, Validators.email
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
     // confirm_password: new FormControl('', [Validators.required]),
      tc_agree: new FormControl(false, [Validators.requiredTrue]),

      // user_type: new FormControl('user', [Validators.requiredTrue]),


    }); // , // {validator: CustomValidators.passwordMatchValidator});
  }

  ngOnInit() {


    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.serverError = null);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);

  }

  /**
   * Method to toggle password show and hide functionality
   */
  togglePasswordDisplay() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.eyeImage = this.eyeImage === 'fa-eye-slash' ? 'fa-eye' : 'fa-eye-slash';
  }

  // toggle(val) {
  //   this.type = val;
  // }

  // document.getElementById('passshow').click(function() {
  //   this.togglePasswordDisplay();

  // }) ;



  onSignup() {
    if (this.signupForm) {
     if (this.captchaSuccess) {
        this.hasServerError = false;
        this.submitted = true;
        this.signupForm.value['is_company'] = true;
        console.log('get sign up value asad:', this.signupForm.value)
        this.registrationService.registerUser(this.signupForm.value)
        .subscribe(
          (regData: IResponse) => {
            if (regData && regData.hasOwnProperty('status')) {
              if (regData.status === 'success') {
                this.registrationStatus = true;
                this.submitted = false;
                this.signupForm.reset(); // Added this

              } else {
                this.showErrorMessage(regData.message);
              }
            } else {
              this.showErrorMessage();
            }
          },
          (error) => {
            console.error(error);
            this.showErrorMessage();
          }
        );
      } else {
        this.captchaError = true;
      }
    } else {
      if (!this.captchaSuccess) {
        this.captchaError = true;
      }
      this.submitted = false;
      Object.keys(this.signupForm.controls).forEach(field => {
        const control = this.signupForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
  resolved(captchaResponse: string) {
    this.captchaSuccess = true;
    this.captchaError = false;
   // console.log(`Resolved captcha with response ${captchaResponse}:`); // TODO: remove
  }

  /**
   * Method to show error message in template
   * @param msg error message
   */
  showErrorMessage(msg = null) {
    //setTimeout(() => this.hasServerError = true, 3000);


     this.hasServerError = true;
    this.submitted = false;
    this.serverError = msg ? msg : 'Sorry an error occurred. Please try again.';
    //  this._success.subscribe((msg) => this.serverError = msg);
     this._success.next(this.serverError);

  //   this._success.pipe(
  //     debounceTime(3000)
  //   ).subscribe(() => this.serverError = null);
 }
 /**
   * Method to show error message in template
   * @param msgs error message
   */
 showSuccessMessage(msgs = null){
  this.registrationStatus = true;
  this.submitted = true;
  this.successMessage = msgs ? msgs : '.تم تسجيل الاشتراك بنجاح. يرجى التحقق من بريدك الإلكتروني وتسجيل الدخول للمتابعة';
      this._success.next(this.successMessage);

}

}
