import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { IWinCompanyInfo } from '../../../shared';
import { ISurvey } from 'src/app/shared/interfaces/ISurvey';
import { SurveyService } from '../../../shared/services/survey.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { NavBarService } from 'src/app/shared/services/nav-bar.service';
import { LanguageTranslationService } from 'src/app/shared/services/language-translation.service';
import { ViewRef_ } from '@angular/core/src/view';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { switchMap, filter } from 'rxjs/operators';
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
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class CompanyComponent implements OnInit {
  public surveyData;
  @Input() company: IWinCompanyInfo;


  public staticImageUrl = null;
  public shareType = ShareType;
  public surveyDatash: ISurvey;
  public surveyDataById: ISurvey;
  public isManageSurvey = false;
  public questionCount;
  public count = 0;
  public category_id;
  public surveyTypes;
  public surveyId: any;
  public toEmails: string[] = [];
  public lookup = [];
  public newEmail: string;
  public deviceType = new DeviceType();
  public surveyMessages = {};
  public surveyShareUrl: string = env.siteUrl.share;
  public uploader: FileUploader = new FileUploader({ url: env.getBulkUploadUrl(), itemAlias: 'file' });
  public surveyStatus = SurveyStatus;
  public surveyType: any;
  public selectLangFlag: any;
  selectedIndex: number = 0;
  public useLang: { name: string };
  public langEN = { name: 'name_en' };
  public langAR = { name: 'name_ar' };

  constructor(private surveyService: SurveyService,
    private localStorage: LocalStorage,
    private navBarService: NavBarService,
    private languageTranslationService: LanguageTranslationService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
  ) {
    this.localStorage.getItem<string>('__rayei-lookup').subscribe(
      (types: Object) => {
        if (types) {
          this.surveyTypes = types['survey_categories'];
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
  }

  ngOnInit() {
    this.surveyService.getAllSurveys("1").subscribe((data) => {
      this.surveyData = data;
    });
    this.localStorage.getItem<string>('__rayei-lookup').subscribe(
      (lookup: string) => {
        // console.log(lookup)
      },
      error => console.warn(error)
    );
  }

  /**
 * Method to publish a survey as win
 */
  //   publishSurveyAsWin(id) {
  //     this.modalService.dismissAll();

  //   this.surveyService.getSurvey(id)
  // .subscribe(
  //   (surveyData: ISurvey) => {
  //     this.surveyDataById = surveyData;

  // this.surveyDataById.status = this.surveyStatus.active;

  // this.surveyService.updateSurvey(this.surveyDataById, this.surveyDataById.id).subscribe(
  //   (res: { message: string }) => {
  //   // Change password alert modal
  //   const modalRef = this.modalService.open(AlertComponent, { centered: true});
  //   modalRef.componentInstance.data = {
  //     title: this.surveyMessages['design_survey.success'],
  //     message: this.surveyMessages['survey_share.survey_shared_successfully']
  //   };
  // });
  //   }
  // );


  // }
  showCategorySurveys(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    const idAttr = target.attributes.id;
    const value = idAttr.nodeValue;
    this.selectedIndex = parseInt(value) - 1;
    // Uncomment all the table code 

    this.surveyService.getAllSurveys(value).subscribe((data) => {
      this.surveyData = data;
    });

    // if (value === 'all') {
    //   this.router.navigate(['/win/list-survey']);
    // } else {
    //   this.router.navigate(['/win/list-survey', value]);
    // }
  }

  /**
  * Method to get share survey url
  * @param surveyData Survey Data
  */
  setSurveyShareUrl(surveyData) {
    if (surveyData.url_code) {
      this.surveyShareUrl = env.siteUrl.share + surveyData.url_code;
      this.detectChanges();
    }
  }
  /**
  * Method to show modal
  * @param modalContent HTML Modal content
  */
  showModal(modalContent, type: ShareType, id) {
    this.surveyService.getSurvey(id)
      .subscribe(
        (surveyData) => {
          this.surveyId = id;
          console.log(surveyData)
          this.setSurveyShareUrl(surveyData);
        });
    let size = (type === this.shareType.link || type === this.shareType.email) ? 'lg' : 'sm';
    if (this.deviceType.isMobile()) {
      size = 'sm';
    }
    this.modalService.open(modalContent, {
      centered: true,
      size: size === 'sm' ? 'sm' : 'lg',
    });
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
    // this.newEmail = event.target.value;
    // console.log(this.newEmail);
    if (event.keyCode === COMMA) {
      console.log(this.newEmail);
      email = this.newEmail.split(',')[0].trim();
      if (this.validateEmail(email)) {
        this.toEmails.push(email);
        this.newEmail = '';
      }
    } else if (event.keyCode === SPACE) {
      // console.log(this.newEmail);
      //  console.log(event.target.value);
      email = this.newEmail.split(' ')[0].trim();
      // email = this.newEmail.value;

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
