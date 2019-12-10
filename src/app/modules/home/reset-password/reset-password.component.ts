import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// @ts-ignore
import { passwordMatchValidator } from '../../../shared/helpers/register.validator';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from 'src/app/shared/modules/message/alert/alert.component';
import { TranslateService } from '@ngx-translate/core';
import { LanguageTranslationService } from 'src/app/shared/services/language-translation.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public surveyMessages = {};

  constructor(
    public route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal,
    private translate: TranslateService,
    private languageTranslationService: LanguageTranslationService,
    public router: Router
  ) {
    // Language change event handling
    this.languageTranslationService.languageTranslation$
    .subscribe(
      (language: string) => {
        this.getSurveyMessages();
      }
    );
  }

  public resetpasswordForm = new FormGroup({
    token : new FormControl(this.route.snapshot.params['token']),
    password : new FormControl('', [
      Validators.required,
      Validators.minLength(8)
      ]
    ),
    confirm_password : new FormControl('', [
      Validators.required,
      Validators.minLength(8)
      ]
    )
  },
  {
    validators: passwordMatchValidator() // Confirm password validation
  }
  );

  get password() { return this.resetpasswordForm.get('password'); }
  get confirm_password() { return this.resetpasswordForm.get('confirm_password'); }

  /*
  * Reset password Submit
  */
  public hasServerError = false;
  public changeStatus = false;
  onResetPasswordSubmit() {
    if (this.resetpasswordForm.valid) {
      // TODO: Use EventEmitter with form value
      console.warn(this.resetpasswordForm.value);
      const data = this.resetpasswordForm.value;
      this.authenticationService.resetPassword(data)
        .subscribe(
          (data) => {
            // TODO: check response status and show error message if any
            // Reset email success modal
            const modalRef = this.modalService.open(AlertComponent, { centered: true});
            modalRef.componentInstance.data = {
              title: this.surveyMessages['design_survey.success'],
              message: this.surveyMessages['my_account.profile.changepassword.change_password_success']
            };
            this.router.navigate(['/login']);
          },
          (error) => {
            console.log(error, 'error');
            this.hasServerError = true;
            this.changeStatus = false;
          }
        );
    } else {
       Object.keys(this.resetpasswordForm.controls).forEach(field => {
        const control = this.resetpasswordForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  // Method to get alert message translations
  getSurveyMessages() {
    // Calling translate service to get translations of given keys
    this.translate.get([
      'my_account.profile.changepassword.change_password_success',
      'design_survey.success',
    ]).subscribe(
      (surveyMessages: object) => {
      this.surveyMessages = surveyMessages;
      }
    );
  }
  ngOnInit() {
    this.getSurveyMessages();
  }

}
