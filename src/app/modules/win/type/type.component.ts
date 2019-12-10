import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { ViewRef_ } from '@angular/core/src/view';
import { SurveyService } from '../../../shared/services/survey.service';
import { ISurvey } from 'src/app/shared/interfaces/ISurvey';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { switchMap, filter } from 'rxjs/operators';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { NavBarService } from 'src/app/shared/services/nav-bar.service';
import { LanguageTranslationService } from 'src/app/shared/services/language-translation.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DeviceType } from 'src/app/shared/helpers/device-type';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import { AlertComponent } from 'src/app/shared/modules/message/alert/alert.component';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { environment as env } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { SurveyStatus } from 'src/app/shared/enum/SurveyStatus';


enum ShareType {
  email,
  link,
  social,
  win
}

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {
  public staticImageUrl = null;
  public shareType = ShareType;
  public surveyData;
  public surveyDatash: ISurvey;
  public surveyDataById: ISurvey;
  public isManageSurvey = false;
  public questionCount;
  public count = 0;
  public category_id;
  public surveyTypes;
  public selectLangFlag: any;
  public useLang: { name: string };
  public langEN = { name: 'name_en' };
  public langAR = { name: 'name_ar' };
  public surveyId: any;
  public toEmails: string[] = [];
  public newEmail: string;
  public deviceType = new DeviceType();
  public surveyMessages = {};
  public surveyShareUrl: string = env.siteUrl.share;
  public uploader: FileUploader = new FileUploader({ url: env.getBulkUploadUrl(), itemAlias: 'file' });
  public surveyStatus = SurveyStatus;


  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private localStorage: LocalStorage,
    private navBarService: NavBarService,
    private languageTranslationService: LanguageTranslationService,
    private authService: AuthenticationService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private activatedRouter: ActivatedRoute,
    private router: Router) {

    this.route.paramMap.subscribe(
      (params => {
        // (+) before `params.get()` turns the string into a number
        this.category_id = +params.get('id');
        this.getCategorySurveys();
      })
    );

    this.localStorage.getItem<string>('survey_types').subscribe(
      (types: Object) => {
        if (types) {
          this.surveyTypes = types;
        } else {
          // this.navBarService.getCategoryList().subscribe(
          //   (list) => {
          //     this.localStorage.setItemSubscribe(
          //       'survey_types',
          //       list
          //     );
          //     this.surveyTypes = list;
          //   }
          // );
        }
      },
      error => console.warn(error)
    );
    this.languageTranslationService.languageTranslation$.subscribe(language => {
      this.useLang = language === 'en' ? this.langEN : this.langAR;
      this.selectLangFlag = language;
    });

    this.localStorage.getItem<string>('language').subscribe(
      (language: string) => {
        this.selectLangFlag = language;
        this.languageTranslationService.onLanguageChange(language);
      },
      error => console.warn(error)
    );

    // Language change event handling
    this.languageTranslationService.languageTranslation$
      .subscribe(
        (language: string) => this.getSurveyMessages()
      );
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      this.surveyService.getAllSurveys(params.id).subscribe((data) => {
        this.surveyData = data;
      });
    });
    this.localStorage.getItem<string>('__rayei-lookup').subscribe(
      (lookup: string) => {
        console.log(lookup)
      },
      error => console.warn(error)
    );

    this.getSurveyMessages();
    this.authService.getMasterData().subscribe(
      (master: any) => {
        if (master && master.hasOwnProperty('static_file_url_prefix')) {
          this.staticImageUrl = master.static_file_url_prefix;
        }
      });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      response = JSON.parse(response);
      this.toEmails = [...this.toEmails, ...response.emails];
    };

  }

  getCategorySurveys() {
    // this.surveyService.getCategorySurveys(this.category_id).subscribe(
    //   (surveyData: ISurvey[]) => {
    //     this.surveyData = surveyData;
    //     console.log(this.surveyData);


    //   }
    // );
  }

  showCategorySurveys(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    const idAttr = target.attributes.id;
    const value = idAttr.nodeValue;
    if (value === 'all') {
      this.router.navigate(['/win/list-survey']);
    } else {
      this.router.navigate(['/win/list-survey', value]);
    }
  }
  /**
 * Method to publish a survey as win
 */
  publishSurveyAsWin(id) {
    this.modalService.dismissAll();

    this.surveyService.getSurvey(id)
      .subscribe(
        (surveyData: ISurvey) => {
          this.surveyDataById = surveyData;

          this.surveyDataById.status = this.surveyStatus.active;

          this.surveyService.updateSurvey(this.surveyDataById, this.surveyDataById.id).subscribe(
            (res: { message: string }) => {
              // Change password alert modal
              const modalRef = this.modalService.open(AlertComponent, { centered: true });
              modalRef.componentInstance.data = {
                title: this.surveyMessages['design_survey.success'],
                message: this.surveyMessages['survey_share.survey_shared_successfully']
              };
            });
        }
      );


  }

  /**
  * Method to show modal
  * @param modalContent HTML Modal content
  */
  showModal(modalContent, type: ShareType) {
    let size = (type === this.shareType.link || type === this.shareType.email) ? 'lg' : 'sm';
    if (this.deviceType.isMobile()) {
      size = 'sm';
    }
    this.modalService.open(modalContent, {
      centered: true,
      size: size === 'sm' ? 'sm' : 'lg',
    });
  }

  sendMails(modal, id) {
    let file;
    this.surveyService.getSurvey(id)
      .subscribe(
        (surveyData: ISurvey) => {
          this.surveyId = surveyData.id;
          this.localStorage.getItem<string>('language').subscribe(
            (language: string) => {
              this.surveyService.shareSurveyByEmail(this.toEmails, this.surveyId, language, file)
                .subscribe(
                  data => {
                    modal.close();
                    const modalRef = this.modalService.open(AlertComponent, { centered: true });
                    modalRef.componentInstance.data = {
                      title: this.surveyMessages['design_survey.success'],
                      message: this.surveyMessages['survey_share.survey_shared_successfully']
                    };
                  },
                  err => console.log(err, 'error')
                );
            }
          );
        }
      );

  }


  emailEntered(event) {
    let email;
    if (event.keyCode === COMMA) {
      email = this.newEmail.split(',')[0].trim();
      if (this.validateEmail(email)) {
        this.toEmails.push(email);
        this.newEmail = '';
      }
    } else if (event.keyCode === SPACE) {
      email = this.newEmail.split(' ')[0].trim();
      if (this.validateEmail(email)) {
        this.toEmails.push(email);
        this.newEmail = '';
      }
    } else if (event.keyCode === ENTER) {
      email = this.newEmail.trim();
      if (this.validateEmail(email)) {
        this.toEmails.push(email);
        this.newEmail = '';
      }
    }
  }
  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  chipDeleted(email: string) {
    this.toEmails = this.toEmails.filter((value, index) => value !== email);
  }
  // Method to get alert message translations
  getSurveyMessages() {
    // Calling translate service to get translations of given keys
    this.translate.get([
      'survey_share.survey_shared_successfully',
      'design_survey.success',
    ]).subscribe(
      (surveyMessages: object) => {
        this.surveyMessages = surveyMessages;
      }
    );
  }

  /**
  * To trigger change detection
  */
  detectChanges() {
    if (this.cdr !== null && this.cdr !== undefined && !(this.cdr as ViewRef_).destroyed) {
      this.cdr.detectChanges();
    }
  }

}
