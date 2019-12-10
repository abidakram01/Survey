import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ViewEncapsulation,
  Input,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';

import { QuestionType } from 'src/app/shared/enum/QuestionType';
import { ISurvey } from 'src/app/shared/interfaces/ISurvey';
import { SurveyDataService } from 'src/app/shared/services/survey-data.service';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';
import { IPage } from 'src/app/shared/interfaces/IPage';
import { IQuestionAction } from 'src/app/shared/interfaces/IQuestionAction';
import { SurveyService } from 'src/app/shared/services/survey.service';
import { UniqueIdHelper } from 'src/app/shared/helpers/unique-Id-helper';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewRef_ } from '@angular/core/src/view';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { SurveyStatus } from 'src/app/shared/enum/SurveyStatus';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageTranslationService } from 'src/app/shared/services/language-translation.service';
import { environment as env } from 'src/environments/environment';
import {TranslateService} from '@ngx-translate/core';
import { AlertComponent } from 'src/app/shared/modules/message/alert/alert.component';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BuilderComponent implements OnInit, OnDestroy {
  public questionType = QuestionType;
  public isEdit = false;
  @Input()
  public surveyData: ISurvey;
  private uniqueIdHelper = new UniqueIdHelper();
  private surveyStatus = SurveyStatus;

  @Input()
  set setIsEdit(editStatus: boolean) {
    this.isEdit = editStatus;
  }

  @ViewChild('editQuestionModal')
  public editQuestionModal: any;
  public editQuestionData: IQuestionAction;
  public editQuestionType: number | string;

  // Property to unsubscribe a shared service
  private surveyBuilderDataUnsubscribe: Subject<void> = new Subject();
  private surveyQuestionAdd: Subject<void> = new Subject();
  private surveyQuestionDelete: Subject<void> = new Subject();
  private surveyQuestionDuplicate: Subject<void> = new Subject();
  private surveyBuilderChange: Subject<void> = new Subject();
  private surveyQuestionEditModal: Subject<void> = new Subject();
  private surveyDesignerChange: Subject<void> = new Subject();

  public language: string;

  public surveyMessages = {};

  constructor(
    private cdr: ChangeDetectorRef,
    private surveyService: SurveyService,
    private surveyDataService: SurveyDataService,
    private localStorage: LocalStorage,
    private router: Router,
    private modalService: NgbModal,
    private languageTranslationService: LanguageTranslationService,
    private translate: TranslateService,
  ) {
    // Subscribing to survey question add changes
    this.surveyDataService.surveyQuestionAdd$.pipe(takeUntil(this.surveyQuestionAdd)).subscribe(questionType => {
      this.addQuestion(questionType);
    });

    // Subscribing to survey builder question deletion changes
    this.surveyDataService.surveyQuestionDelete$
      .pipe(takeUntil(this.surveyQuestionDelete))
      .subscribe((questionDeleteData: IQuestionAction) => {
        this.deleteQuestion(questionDeleteData);
      });

    // Subscribing to survey builder question duplication
    this.surveyDataService.surveyQuestionDuplicate$
      .pipe(takeUntil(this.surveyQuestionDuplicate))
      .subscribe((questionData: IQuestionAction) => {
        this.duplicateQuestion(questionData);
      });

    // Subscribing to survey builder question duplication
    this.surveyDataService.surveyBuilderChange$.pipe(takeUntil(this.surveyBuilderChange)).subscribe(() => {
      // Save survey data to local storage
      this.addSurveyToLocalStorage();
    });

    // Subscribing to survey builder question duplication
    this.surveyDataService.surveyDesignChange$.pipe(takeUntil(this.surveyDesignerChange)).subscribe(
      (data: { title?: string, description?: string, thankyou_message?: string }) => {
        if (data.hasOwnProperty('title') && data.title.length) {
          this.surveyData.name = data.title;
        }
        if (data.hasOwnProperty('description') && data.description.length) {
          this.surveyData.description = data.description;
        }
        if (data.hasOwnProperty('thankyou_message') && data.thankyou_message.length) {
          this.surveyData.thankyou_message = data.thankyou_message;
        }
        // Save survey data to local storage
        this.addSurveyToLocalStorage();
    });

    // Subscribing to the language changes
    this.languageTranslationService.languageTranslation$.subscribe(language => {
      this.language = language;
      this.getSurveyMessages();
      this.detectChanges();
    });
  }

  ngOnInit() {
    this.getSurveyMessages();

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

    // Subscribing to survey builder form submit changes
    this.surveyDataService.surveyBuilderData$.pipe(takeUntil(this.surveyBuilderDataUnsubscribe)).subscribe(() => {
      if (!this.isEdit) {
        this.createSurvey();
      } else {
        this.updateSurvey();
      }
    });

    // Getting unsaved data from local storage
    this.localStorage.getItem<ISurvey>('survey').subscribe((surveyData: ISurvey) => {
      if (surveyData) {
        this.surveyData = surveyData;
        this.detectChanges();
      }
    });
  }

  // Method to get alert message translations
  getSurveyMessages() {
    // Calling translate service to get translations of given keys
    this.translate.get([
      'design_survey.survey_saved_successfully',
      'design_survey.success',
    ]).subscribe(
      (surveyMessages: object) => {
      this.surveyMessages = surveyMessages;
      }
    );
  }

  /**
   * Method to create survey
   */
  createSurvey() {
    if (!this.surveyData.name) {
      this.surveyData.name = 'Untitled Survey';
    }
    this.localStorage.getItem<any>('userData').subscribe((data: any) => {
      this.surveyService
        .createSurvey(this.surveyData, data.user_id)
        .subscribe((res: {message: string, survey_id: number, url_code: string}) => {
          this.surveyData.id = res.survey_id;
          this.surveyData.url_code = res.url_code;
          // Save updated survey data in local storage
          this.addSurveyToLocalStorage();

          // Survey update modal
          const modalRef = this.modalService.open(AlertComponent, { centered: true});
          // Navigate to edit survey route on modal close
          modalRef.result.then(
            () => {
              this.router.navigateByUrl('/survey/manage/' + res.survey_id);
              // Sending survey create response data to manage.component.ts for survey preview
              // this.surveyDataService.previewSurveyTriggerSource.next(res);
            }
          );
          modalRef.componentInstance.data = {
            title: this.surveyMessages['design_survey.success'],
            message: this.surveyMessages['design_survey.survey_saved_successfully']
          };
        });
    });
  }

  /**
   * Method to update survey
   */
  updateSurvey() {
    if (!this.surveyData.name) {
      this.surveyData.name = 'Untitled Survey';
    }
    this.localStorage.getItem<any>('userData').subscribe((data: any) => {
      this.surveyService
        .updateSurvey(this.surveyData, this.surveyData.id)
        .subscribe((res: {message: string, survey_id: number, url_code: string}) => {
          // Survey update modal
          const modalRef = this.modalService.open(AlertComponent, { centered: true});
          modalRef.componentInstance.data = {
            title: this.surveyMessages['design_survey.success'],
            message: this.surveyMessages['design_survey.survey_saved_successfully']
          };
        });
    });
  }

  /**
   * To trigger change detection
   */
  detectChanges() {
    if (this.cdr !== null && this.cdr !== undefined && !(this.cdr as ViewRef_).destroyed) {
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.

    // Unsubscribing from shared services
    this.surveyBuilderDataUnsubscribe.next();
    this.surveyBuilderDataUnsubscribe.complete();

    this.surveyQuestionAdd.next();
    this.surveyQuestionAdd.complete();

    this.surveyQuestionDelete.next();
    this.surveyQuestionDelete.complete();

    this.surveyQuestionDuplicate.next();
    this.surveyQuestionDuplicate.complete();

    this.surveyQuestionEditModal.next();
    this.surveyQuestionEditModal.complete();

    this.surveyBuilderChange.next();
    this.surveyBuilderChange.complete();

    this.surveyDesignerChange.next();
    this.surveyDesignerChange.complete();

  }

  /**
   * Method to add a question
   */
  addQuestion(inputType: QuestionType): void {
    // const surveyIndex = this.surveyData.length - 1;
    const pageIndex = this.surveyData.pages.length - 1;
    const questionIndex = this.surveyData.pages[pageIndex].questions.length - 1;
    const surveyData = this.surveyData.pages[pageIndex].questions;

    /**
     * NOTE: Only checkbox, drop-down, multiple choice will have a default option
     */

    // Add new question if the given question type is valid
    if (inputType in this.questionType) {
      const newQuestionData: IQuestion = {
        component_id: this.uniqueIdHelper.getUniqueId(),
        question: 'Question',
        options: [],
        order: questionIndex + 1,
        question_type: {
          question_type: inputType,
          status: true
        }
      };

      // Default question for checkbox, dropdown, multiple choice
      if (
        inputType === this.questionType.checkbox ||
        inputType === this.questionType.dropdown ||
        inputType === this.questionType.multipleChoice
      ) {
        newQuestionData.options.push({
          component_id: this.uniqueIdHelper.getUniqueId(),
          order: 1,
          name: 'option 1',
          value: ''
        });
      }

      // Default question for single input
      if (inputType === this.questionType.rating) {
        for (let i = 1; i <= 10; i++) {
          newQuestionData.options.push({
            component_id: this.uniqueIdHelper.getUniqueId(),
            order: i,
            name: `${i}`,
          });
        }
      }

      // Adding question data in the survey data
      surveyData.push(newQuestionData);
      // Save survey data to local storage
      this.addSurveyToLocalStorage();
      // Triggering change detection
      this.detectChanges();
    }
  }

  /**
   * Method to add a question
   */
  deleteQuestion(questionDeleteData: IQuestionAction): void {
    // const surveyIndex = this.surveyData.findIndex(survey => survey.component_id === questionDeleteData.surveyId);
    const pageIndex = this.surveyData.pages.findIndex(page => page.component_id === questionDeleteData.pageId);
    const questionIndex = this.surveyData.pages[pageIndex].questions.findIndex(
      question => question.component_id === questionDeleteData.questionId
    );

    this.surveyData.pages[pageIndex].questions.splice(questionIndex, 1);
    // Save survey data to local storage
    this.addSurveyToLocalStorage();
    // Triggering change detection
    this.detectChanges();
  }

  /**
   * Method to add a question
   */
  duplicateQuestion(questionData: IQuestionAction): void {
    // const surveyIndex = this.surveyData.findIndex(survey => survey.component_id === questionData.surveyId);
    const pageIndex = this.surveyData.pages.findIndex(page => page.component_id === questionData.pageId);
    const lastQuestionCount = this.surveyData.pages[pageIndex].questions.length;

    if (questionData.question.question_type.question_type in this.questionType) {
      const question: IQuestion = questionData.question;

      const newQuestionData: IQuestion = {
        component_id: this.uniqueIdHelper.getUniqueId(),
        question: question.question,
        options: question.options,
        order: lastQuestionCount + 1,
        question_type: {
          question_type: question.question_type.question_type,
          status: question.question_type.status
        },
        answer: question.answer
      };
      this.surveyData.pages[pageIndex].questions.push(newQuestionData);
      // Save survey data to local storage
      this.addSurveyToLocalStorage();
      // Triggering change detection
      this.detectChanges();
    }
  }

  /**
   * Function called in ngFor to track items in the survey array
   * https://angular.io/api/core/TrackByFunction
   * @param index Current loop index
   * @param item Current survey data
   */
  surveyTrackByFn(index: number, item: ISurvey) {
    return item.component_id;
  }

  /**
   * Function called in ngFor to track items in the page array
   * https://angular.io/api/core/TrackByFunction
   * @param index Current loop index
   * @param item Current survey data
   */
  pageTrackByFn(index: number, item: IPage) {
    return item.component_id;
  }

  /**
   * Function called in ngFor to track items in the question array
   * https://angular.io/api/core/TrackByFunction
   * @param index Current loop index
   * @param item Current survey data
   */
  questionTrackByFn(index: number, item: IQuestion) {
    return item.component_id;
  }

  /**
   * Adds survey data to local storage
   */
  addSurveyToLocalStorage() {
    // Save to local storage
    this.localStorage.setItemSubscribe('survey', this.surveyData);
  }
}
