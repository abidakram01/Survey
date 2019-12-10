import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { QuestionType } from 'src/app/shared/enum/QuestionType';
import { SurveyDataService } from 'src/app/shared/services/survey-data.service';
import { ISurvey } from 'src/app/shared/interfaces/ISurvey';
import { FormControl, FormGroup } from '@angular/forms';
import { ViewRef_ } from '@angular/core/src/view';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { SurveyService } from 'src/app/shared/services/survey.service';
import { environment as env } from 'src/environments/environment';
import { LanguageTranslationService } from 'src/app/shared/services/language-translation.service';
import { SurveyTabStatus } from 'src/app/shared/enum/SurveyTab';
import { AlertComponent } from 'src/app/shared/modules/message/alert/alert.component';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { TranslateService } from '@ngx-translate/core';
import {Location} from '@angular/common';


@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {
  public surveyData: ISurvey;
  public questionType = QuestionType;
  public isEdit = false;
  public surveyID: number;

  @ViewChild('surveyTitleModal')
  public surveyTitleModal: any;

  @ViewChild('surveyTypeModal')
  public surveyTypeModal: any;

  @ViewChild('newQuestionModal')
  public newQuestionModal: any;

  public surveyTitleForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    thankyou_message: new FormControl('')
  });

  public surveyEditor = ClassicEditor;
  public surveyDescriptionFormControl = '';
  public surveyDescriptionConfig = {
    language: 'en',
    toolbar: [
      'undo', 'redo',
      '|',
      'bold', 'italic', 'heading', 'numberedlist', 'bulletedlist',
      '|',
      'inserttable', 'tablecolumn', 'tablerow', 'mergetablecells',
      '|',
      // 'link',
      // '|',
    ]
  };

  public language: any;

  public tabIdData = SurveyTabStatus;

  public uploader: FileUploader = new FileUploader({});

  // Property to check if survey builder has been edited.
  // This used to show waring when clicks next button
  public isSurveyBuilderDirty = false;

  public surveyMessages = {};

  constructor(
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private surveyDataService: SurveyDataService,
    private surveyService: SurveyService,
    private languageTranslationService: LanguageTranslationService,
    private localStorage: LocalStorage,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private _location: Location
  ) {

  }

  ngOnInit() {
    this.getSurveyMessages();

    if (this.route.snapshot.params.hasOwnProperty('id')) {
      this.surveyID = this.route.snapshot.params['id'];
      this.isEdit = true;
      this.uploader.setOptions({ url: env.getLogoUpdateUrl(this.surveyID), itemAlias: 'survey_logo' });
    }

    // Getting survey data from local storage
    this.localStorage.getItem<ISurvey>('survey').subscribe((surveyData: ISurvey) => {
      if (surveyData) {
        this.initializeSurvey(surveyData);
      } else {
        this.surveyData = this.surveyService.getNewSurvey();
        this.detectChanges();
      }
    });

    // Setting language setting from local storage
    this.localStorage.getItem<string>('language').subscribe(
      (language: string) => {
        if (language) {
          this.language = language;
        } else {
          this.language = env.defaultLanguage;
        }
      },
      error => {
        console.error(error);
        this.language = env.defaultLanguage;
      }
    );

    // Subscribing to the language changes
    this.languageTranslationService.languageTranslation$.subscribe(language => {
      this.language = language;
      this.getSurveyMessages();
      this.detectChanges();
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', response, typeof response);
      try {
        response = JSON.parse(response);
      } catch (error) {
        console.warn(error);
      }
      // Update survey log on survey data
      if (response.hasOwnProperty('survey_logo') && response.survey_logo) {
        this.surveyData.survey_logo = response.survey_logo;
        this.detectChanges();
      }
    };

    this.localStorage.getItem('access_token')
      .subscribe(token => {
        this.uploader.authToken = `Token ${token}`;
        this.uploader.authTokenHeader = 'Authorization';
      });

    this.surveyDataService.surveyBuilderChange$.subscribe(
      (res) => {
        this.isSurveyBuilderDirty = true;
      }
    );

  }


  backClicked() {
    this._location.back();
  }

  // Method to get alert message translations
  getSurveyMessages() {
    // Calling translate service to get translations of given keys
    this.translate.get([
      'design_survey.warning_message',
      'design_survey.warning',
    ]).subscribe(
      (surveyMessages: object) => {
      this.surveyMessages = surveyMessages;
      }
    );
  }

  /**
   * Method to initialize survey data
   * @param surveyData Survey Data
   */
  initializeSurvey(surveyData: ISurvey) {
    this.surveyData = surveyData;
    // Auto-filling title form
    this.surveyTitleForm.patchValue({
      title: surveyData.name || '',
      description: surveyData.description || '',
      thankyou_message: surveyData.thankyou_message || ''
    });

    this.detectChanges();
  }

  /**
   * Method to add a question
   */
  addQuestion(questionInputType: QuestionType): void {
    this.isSurveyBuilderDirty = true;
    // Calling method on shared service for performing the action
    this.surveyDataService.onSurveyBuilderQuestionAdd(questionInputType);
  }

  /**
   * Method to show add new question modal in mobile view
   */
  showAddNewQuestionModal() {
    this.modalService.open(this.newQuestionModal, { centered: true });
  }

  /**
   * Survey Builder submit button click event
   */
  onSurveyBuilderSubmit() {
    this.isSurveyBuilderDirty = false;
    // Calling method on shared service for performing the action
    this.surveyDataService.onSurveyBuilderFormSubmit();
  }

  /**
   * Survey Builder add question click button event
   */
  openSurveyTitleModal() {
    this.modalService.open(this.surveyTitleModal, { centered: true });
  }

  /**
   * On Survey Title change
   */
  onSurveyTitleFormSubmit() {
    this.isSurveyBuilderDirty = true;
    this.surveyData.name = this.surveyTitleForm.get('title').value;
    this.surveyData.description = this.surveyTitleForm.get('description').value;
    this.surveyData.thankyou_message = this.surveyTitleForm.get('thankyou_message').value;
    this.surveyTitleForm.patchValue({
      title: this.surveyData.name,
      description: this.surveyData.description,
      thankyou_message: this.surveyData.thankyou_message
    });
    this.surveyDataService.onSurveyDesignPageChanges({
      title: this.surveyData.name,
      description: this.surveyData.description,
      thankyou_message: this.surveyData.thankyou_message
    });
    // Save changes to the local storage
    this.surveyDataService.onSurveyBuilderChanges();
    // Closes the modal
    this.modalService.dismissAll();
    // Trigger Change detection
    this.detectChanges();
  }

  /**
   * To trigger change detection
   */
  detectChanges() {
    if (this.cdr !== null && this.cdr !== undefined && !(this.cdr as ViewRef_).destroyed) {
      this.cdr.detectChanges();
    }
  }

  /**
   * To go to next survey step
   * @param nextTab Next survey step
   */
  onSurveyStepChange(nextTab: SurveyTabStatus) {
    if (nextTab in this.tabIdData) {
      if (!this.isSurveyBuilderDirty) {
        this.surveyDataService.onSurveyStepChangeSource.next(nextTab);
      } else {
        // alert modal
        const modalRef = this.modalService.open(AlertComponent, { centered: true });
        modalRef.componentInstance.data = {
          title: this.surveyMessages['design_survey.warning'],
          message: this.surveyMessages['design_survey.warning_message']
        };
      }
    }
  }
}
