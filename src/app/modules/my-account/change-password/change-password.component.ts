import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavBarService } from 'src/app/shared/services/nav-bar.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomValidators } from 'src/app/shared/modules/layouts/rayei/signup/custom-validators';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AlertComponent } from 'src/app/shared/modules/message/alert/alert.component';
import { TranslateService } from '@ngx-translate/core';
import { LanguageTranslationService } from 'src/app/shared/services/language-translation.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  @ViewChild('modalContent')
  modalContent: string;

  private passwordLinkActionUnsubscribe: Subject<void> = new Subject();

  public hasServerError = false;
  public serverError = '';

  public changePasswordForm: FormGroup;

  get current_password() {
    return this.changePasswordForm.get('current_password');
  }
  get password() {
    return this.changePasswordForm.get('password');
  }
  get confirm_password() {
    return this.changePasswordForm.get('confirm_password');
  }

  public surveyMessages = {};
  constructor(
    private fb: FormBuilder,
    private navBarService: NavBarService,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService,
    private translate: TranslateService,
    private languageTranslationService: LanguageTranslationService,
  ) {
    // Language change event handling
    this.languageTranslationService.languageTranslation$
    .subscribe(
      (language: string) => {
        this.getSurveyMessages();
      }
    );

    this.navBarService.passwordNavBtnAction$
      .pipe(takeUntil(this.passwordLinkActionUnsubscribe))
      .subscribe((res) => {
        this.modalService.open(this.modalContent, { centered: true });
      });
    this.changePasswordForm = this.createChangePasswordForm();
  }

  ngOnInit() {
    this.getSurveyMessages();
    this.changePasswordForm.get('current_password').valueChanges.subscribe(val => {
      this.hasServerError = false;
    });
  }

  ngOnDestroy() {
    this.passwordLinkActionUnsubscribe.next();
    this.passwordLinkActionUnsubscribe.complete();
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

  public createChangePasswordForm() {
    return this.fb.group(
      {
        current_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirm_password: new FormControl('', [Validators.required, Validators.minLength(8)])
      },
      { validator: CustomValidators.passwordMatchValidator }
    );
  }
  onPassowrdChange() {
    if (this.changePasswordForm.valid) {
      const data = this.changePasswordForm.value;
      this.authenticationService.changePassword(data).subscribe(
        data => {
          // TODO: check response status and show error message if any
          // On success, dismissing change password modal and displaying the success alert
          this.modalService.dismissAll();

          // Change password alert modal
          const modalRef = this.modalService.open(AlertComponent, { centered: true});
          modalRef.componentInstance.data = {
            title: this.surveyMessages['design_survey.success'],
            message: this.surveyMessages['my_account.profile.changepassword.change_password_success']
          };
        },
        error => {
           this.hasServerError = true;
          this.serverError = 'Password change failed';
        }
      );
    } else {
      Object.keys(this.changePasswordForm.controls).forEach(field => {
        const control = this.changePasswordForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}
