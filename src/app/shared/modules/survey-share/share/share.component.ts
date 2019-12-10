import { Component, EventEmitter, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { ISurvey } from 'src/app/shared/interfaces/ISurvey';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment as env } from 'src/environments/environment';
import { ViewRef_ } from '@angular/core/src/view';
import { SurveyStatus } from 'src/app/shared/enum/SurveyStatus';
import { SurveyService } from 'src/app/shared/services/survey.service';
import { AlertComponent } from 'src/app/shared/modules/message/alert/alert.component';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router, ActivatedRoute } from '@angular/router';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { FileUploader } from 'ng2-file-upload';
import { DeviceType } from 'src/app/shared/helpers/device-type';
import { TranslateService } from '@ngx-translate/core';
import { LanguageTranslationService } from 'src/app/shared/services/language-translation.service';
enum ShareType {
  email,
  link,
  social,
  win
}

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ShareComponent implements OnInit {
  public surveyData: ISurvey;
  public surveyShareUrl: string;
  public shareType = ShareType;
  public surveyStatus = SurveyStatus;
  public isManageSurvey = false;
  public surveyId: number;
  public toEmails: string[] = [];
  public newEmail: string;
  public deviceType = new DeviceType();

  public surveyMessages = {};
  public uploader: FileUploader = new FileUploader({ url: env.getBulkUploadUrl(), itemAlias: 'file' });
  public qr_link;
  public randomNum: any;
  public file: any;
  constructor(
    private localStorage: LocalStorage,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private surveyService: SurveyService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private languageTranslationService: LanguageTranslationService
  ) {

    // Language change event handling
    this.languageTranslationService.languageTranslation$
      .subscribe(
        (language: string) => this.getSurveyMessages()
      );
  }
  downloadPdf() {
    html2canvas(document.querySelector(".capture")).then(canvas => {
      var imgData = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
      window.location.href=imgData;
    });
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

  ngOnInit() {

    // Gets survey data
    this.isManageSurvey = this.router.url.includes('manage');
    this.surveyId = +this.route.snapshot.params['id'];
    this.surveyService.getSurvey(this.surveyId)
      .subscribe(
        (surveyData: ISurvey) => {
          this.surveyData = surveyData;
          this.randomNum = this.surveyData['integer_code']
          this.setSurveyShareUrl(surveyData);
        }
      );

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      response = JSON.parse(response);
      this.toEmails = [...this.toEmails, ...response.emails];
    };
  }
  uploadFile(event) {
    let files = event.target.files;
    if (files.length > 0) {
      this.file = files; // You will see the file
    }
  }
  readBase64(file): Promise<any> {
    var reader = new FileReader();
    var future = new Promise((resolve, reject) => {
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.addEventListener("error", function (event) {
        reject(event);
      }, false);

      reader.readAsDataURL(file);
    });
    return future;
  }
  onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    // this.file = file;     
  }



  /**
   * Method to get share survey url
   * @param surveyData Survey Data
   */
  setSurveyShareUrl(surveyData) {
    if (surveyData.url_code) {
      this.surveyShareUrl = env.siteUrl.share + surveyData.url_code;
      this.detectChanges();
      this.qr_link = this.surveyShareUrl;
    }
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

  /**
   * Method to publish a survey as win
   */
  publishSurveyAsWin() {
    this.modalService.dismissAll();
    this.surveyData.status = this.surveyStatus.active;
    this.surveyService.updateSurvey(this.surveyData, this.surveyData.id).subscribe((res: { message: string }) => {
      // Change password alert modal
      const modalRef = this.modalService.open(AlertComponent, { centered: true });
      modalRef.componentInstance.data = {
        title: this.surveyMessages['design_survey.success'],
        message: this.surveyMessages['survey_share.survey_shared_successfully']
      };
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

  sendMails(modal) {
    let formdata = new FormData();
    let file = this.file[0];
    formdata.append('email_file', file, file.name);
    this.localStorage.getItem<string>('language').subscribe(
      (language: string) => {
        this.surveyService.shareSurveyByEmail(this.toEmails, this.surveyId, language, this.file)
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
}
