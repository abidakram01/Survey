import { Component, OnInit , ChangeDetectorRef, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import { ViewRef_ } from '@angular/core/src/view';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { SurveyService } from 'src/app/shared/services/survey.service';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from 'src/app/shared/modules/message/confirm/confirm.component';
import { AlertComponent } from 'src/app/shared/modules/message/alert/alert.component';
import { CompanySurveysService } from 'src/app/shared/services/company-surveys.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { TranslateService } from '@ngx-translate/core';
import { LanguageTranslationService } from 'src/app/shared/services/language-translation.service';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css']
})
export class SurveysComponent implements OnInit {
  company_id: number;
  surveys$: any;
  userProfile: any;
  public language: any;
  public useLang: { name: string };
  public langEN = { name: 'name_en' };
  public langAR = { name: 'name_ar' };

  public companyShareUrl = '';

  public surveyMessages = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService,
    private surveyService: SurveyService,
    private modalService: NgbModal,
    private companyService: CompanySurveysService,
    private localStorage: LocalStorage,
    private translate: TranslateService,
    private languageTranslationService: LanguageTranslationService,
    private cdr: ChangeDetectorRef
  ) {
    this.localStorage.getItem('userData')
    .subscribe((profile: any) => {
      this.userProfile = profile;
    });

    // Language change event handling
    this.languageTranslationService.languageTranslation$
    .subscribe(
      (language: string) => {
        this.getSurveyMessages();
      }
    );
  }

  ngOnInit() {

    // Gets the chosen language
    this.localStorage.getItem<string>('language').subscribe(
      (language: string) => {
        if (language) {
          this.language = language;
        } else {
          this.language = env.defaultLanguage;
        }
        this.useLang = language === 'en' ? this.langEN : this.langAR;
      },
      err => this.language = env.defaultLanguage
    );

    // Subscribing to the language changes
    this.languageTranslationService.languageTranslation$
    .subscribe(
      (language) => {
        this.language = language;
        this.useLang = language === 'en' ? this.langEN : this.langAR;
        this.detectChanges();
      }
    );
    this.getSurveyMessages();

    this.surveys$ = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.company_id = +params.get('id');
        return this.dashboardService.getCompanySurveys(this.company_id);
      })
    );
  }

  // Method to get alert message translations
  getSurveyMessages() {
    // Calling translate service to get translations of given keys
    this.translate.get([
      'my_surveys_page.delete_success',
      'my_surveys_page.delete_warning',
      'design_survey.success',
      'design_survey.warning',
      'server_error.heading',
      'server_error.title',
      'server_error.description',
    ]).subscribe(
      (surveyMessages: object) => {
      this.surveyMessages = surveyMessages;
      }
    );
  }

  deleteSurvey(survey) {
    // survey.status = 'deleted';
    // this.surveyService.updateSurvey(survey, survey.id)
    // .subscribe(
    //   data => {this.loadSurveys();},
    //   err => console.log("failed", err)
    // );

    // Modal message
    const modalRef = this.modalService.open(ConfirmComponent, { centered: true});
    // Redirect user to home when survey success modal is closed
    modalRef.result.then((status) => {
      if (status) {
        survey.status = 'deleted';
        // Modal message
        const alertModalRef = this.modalService.open(AlertComponent, { centered: true});
        this.surveyService.updateSurvey(survey, survey.id)
        .subscribe(
          data => {
            alertModalRef.componentInstance.data = {
              title: this.surveyMessages['design_survey.success'],
              message: this.surveyMessages['my_surveys_page.delete_success']
            };
            this.loadSurveys();
          },
          err => {
            let errorMessage = this.surveyMessages['server_error.title'];
            errorMessage += this.surveyMessages['server_error.description'];
            alertModalRef.componentInstance.data = {
              title: this.surveyMessages['server_error.heading'],
              message: errorMessage
            };
            console.error('failed', err);
          }
        );
      }

    });
    modalRef.componentInstance.data = {
      title: this.surveyMessages['design_survey.warning'],
      message: this.surveyMessages['my_surveys_page.delete_warning']
    };
  }

  loadSurveys() {
    this.surveys$ = this.dashboardService.getCompanySurveys(this.company_id);
  }

  /**
   * Method to show modal
   * @param modalContent HTML Modal content
   */
  openGenerateCode(modalContent) {
    this.setCompanyShareUrl();
    this.modalService.open(modalContent, {
      centered: true,
     });
  }

  /**
   * Method to get share survey url
   * @param surveyData Survey Data
   */
  setCompanyShareUrl() {
    if (this.userProfile.user_id) {
      this.companyService.getCompanyToken(this.userProfile.user_id).subscribe(
        (token: any) => {
          this.companyShareUrl = env.companyURL.share + token.code;
        }
      );
     return this.companyShareUrl;
    }
  }

  /**
   * Method to copy share url to clipboard
   * @param shareUrl
   */
  copyInputMessage(shareLink) {
    shareLink.select();
    document.execCommand('copy');
    shareLink.setSelectionRange(0, 0);
  }
 /**
   * To trigger change detection
   */
  detectChanges() {
    if ( this.cdr !== null &&
      this.cdr !== undefined &&
      ! (this.cdr as ViewRef_).destroyed ) {
      this.cdr.detectChanges();
    }
  }
}
