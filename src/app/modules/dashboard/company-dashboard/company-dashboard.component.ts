import { Component, OnInit, OnDestroy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment as env } from '../../../../environments/environment';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { IUserProfile } from 'src/app/shared';
import { LanguageTranslationService } from 'src/app/shared/services/language-translation.service';
import { USE_STORE, TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanySurveysService } from 'src/app/shared/services/company-surveys.service';
import { SurveyService } from 'src/app/shared/services/survey.service';
import { AlertComponent } from 'src/app/shared/modules/message/alert/alert.component';
import { ConfirmComponent } from 'src/app/shared/modules/message/confirm/confirm.component';
import { ViewRef_ } from '@angular/core/src/view';


@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})
export class CompanyDashboardComponent implements OnInit, OnDestroy {
  private languageTranslationUnsubscribe: Subject<void> = new Subject();
  public language: any;
  companyProfile: any;
  userProfile: any;
  recentSurveys: any;
  surveyCount: any;
  surveys$: any;
  public companyShareUrl = '';

  public profile_pic;

  @Output()
  company_id = new EventEmitter(); // NEED TO CHANGE!

  public surveyMessages = {};

  constructor(
    private dashboardService: DashboardService,
    private localStorage: LocalStorage,
    private languageTranslationService: LanguageTranslationService,
    private datepipe: DatePipe,
    public router: Router,
    private sanitization: DomSanitizer,
    private modalService: NgbModal,
    private companyService: CompanySurveysService,
    private surveyService: SurveyService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
  ) {
    this.localStorage.getItem<string>('language').subscribe(
      (language: string) => {
        if (language) {
          this.language = language;
        } else {
          // If failed to find the selected language from local storage,
          // then set the default language from app config
          this.language = env.defaultLanguage;
        }
      },
      (error) => console.warn(error)
    );

    // Language change event handling
    this.languageTranslationService.languageTranslation$
      .pipe(takeUntil(this.languageTranslationUnsubscribe))
      .subscribe(
        (language: string) => {
          this.language = language;
          this.getSurveyMessages();
          this.detectChanges();
        }
      );
    // dashboardService.setUserProfile();
    this.localStorage.getItem('userData')
        .subscribe((profile: any) => {
          this.userProfile = profile;
          this.profile_pic = '/assets/img/user-default.jpg';
          if (this.userProfile && this.userProfile.profile_pic !== '') {
            this.profile_pic = this.sanitization.bypassSecurityTrustUrl(this.userProfile.profile_pic);
          }
          console.log(this.userProfile)
          this.loadProfile(this.userProfile.user.id);
          this.loadSurveyCount(this.userProfile.user.id);
          this.surveys$ = this.dashboardService.getCompanySurveys(this.userProfile.user.id);

        });

  }

  ngOnInit() {
    this.getSurveyMessages();

  }

  ngOnDestroy() {
    this.languageTranslationUnsubscribe.next();
    this.languageTranslationUnsubscribe.complete();
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

  /**
   * Calls shared service method to show account modal
   */
  openCreateSurveyModal() {
    this.dashboardService.displayDashboardModal();
  }

  loadProfile(userId: number) {
    this.dashboardService.getCompanyProfile(userId)
        .subscribe(data => {
             this.companyProfile = data;
            this.company_id.emit(this.companyProfile.user.id);
            this.loadSurveys(this.companyProfile.user.id);
        });
    }

  loadSurveys(company_id: number) {
    // this.dashboardService.getRecentSurveys(company_id)
    //   .subscribe(
    //     data => {
    //        this.recentSurveys = data;
    //     }
    //   );
  }

  languageContent(data: any): string {
    if (data === null || data === undefined) {
      return '';
    }
    return this.language === 'en' ? data.name_en : data.name_ar;
  }

  editSurvey(survey_id) {
    this.router.navigate(['/survey/start-survey/' + survey_id]);
  }

  convertDate(date) {
    return this.datepipe.transform(new Date(date), 'dd-MM-yyyy');
  }

  deleteSurvey(survey) {
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
              this.loadSurveys(this.companyProfile.user.id);
              
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

  loadSurveyCount(company_id: number) {
    // this.dashboardService.getSurveyCount(company_id)
    //   .subscribe(
    //     data => {
    //       this.surveyCount = data;
    //     }
    //   );
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
}
