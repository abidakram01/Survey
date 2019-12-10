import { Component, OnInit, Input } from '@angular/core';
import { AlertComponent } from '../../../message/alert/alert.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavBarService } from 'src/app/shared/services/nav-bar.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageTranslationService } from 'src/app/shared/services/language-translation.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  @Input()
  selected: string;

  public submitted = false;

  /*
   * Reset password Submit
   */
  public hasServerError = false;
  public serverError = '';

  public forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  public surveyMessages = {};

  constructor(
    private navbarService: NavBarService,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal,
    private translate: TranslateService,
    private languageTranslationService: LanguageTranslationService,
  ) {
    // Subscribing to the language changes
    this.languageTranslationService.languageTranslation$.subscribe(language => {
      this.getSurveyMessages();
    });
  }

  ngOnInit() {
    this.getSurveyMessages();
  }

  // Method to get alert message translations
  getSurveyMessages() {
    // Calling translate service to get translations of given keys
    this.translate.get([
      'error_message.forgot_password_success',
      'design_survey.success',
      'error_message.change_password_fail',
    ]).subscribe(
      (surveyMessages: object) => {
      this.surveyMessages = surveyMessages;
      }
    );
  }

  onBackToLoginClick() {
    this.navbarService.showForgotPassword({ islogin: true, isForgot: false });
  }

  onForgotPasswordSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.submitted = true;
      const data = this.forgotPasswordForm.value;
      this.authenticationService.forgotPassword(data).subscribe(
        data => {
          this.submitted = false;
          // TODO: check response status and show error message if any
          // Dismiss account modal and show the reset email success modal
          this.modalService.dismissAll();
          // Reset email success modal
          const modalRef = this.modalService.open(AlertComponent, { centered: true});
          modalRef.componentInstance.data = {
            title: this.surveyMessages['design_survey.success'],
            message: this.surveyMessages['error_message.forgot_password_success'],
          };
        },
        error => {
          this.submitted = false;
          console.log(error, 'error'); // zzz
          this.hasServerError = true;
          this.serverError = this.surveyMessages['error_message.change_password_fail'];
        }
      );
    } else {
      this.submitted = false;
      console.log('form is invalid'); // zzz
      Object.keys(this.forgotPasswordForm.controls).forEach(field => {
        const control = this.forgotPasswordForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

}
