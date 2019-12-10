/**
 * User in SurveyBuilderModule for its component communication
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IQuestionAction } from '../interfaces/IQuestionAction';
import { IQuestion } from '../interfaces/IQuestion';
import { ISurvey } from '../interfaces/ISurvey';
import { FormGroup } from '@angular/forms';
import { SurveyTabStatus } from '../enum/SurveyTab';
import { SurveyStatus } from '../enum/SurveyStatus';

@Injectable()
export class SurveyDataService {
  // properties for survey builder form submit communication
  private surveyBuilderDataSource = new Subject();
  public surveyBuilderData$ = this.surveyBuilderDataSource.asObservable();

  // properties for survey builder question deletion
  private surveyQuestionDeleteSource = new Subject<IQuestionAction>();
  public surveyQuestionDelete$ = this.surveyQuestionDeleteSource.asObservable();

  // properties for survey builder question add
  private surveyQuestionAddSource = new Subject<number>();
  public surveyQuestionAdd$ = this.surveyQuestionAddSource.asObservable();

  // properties for survey builder question deletion
  private surveyQuestionDuplicateSource = new Subject<IQuestionAction>();
  public surveyQuestionDuplicate$ = this.surveyQuestionDuplicateSource.asObservable();

  // properties for saving the survey title
  private surveyDesignChangeSource = new Subject<object>();
  public surveyDesignChange$ = this.surveyDesignChangeSource.asObservable();

  // properties for saving the survey builder changes to local storage
  private surveyBuilderChangeSource = new Subject<IQuestionAction>();
  public surveyBuilderChange$ = this.surveyBuilderChangeSource.asObservable();

  // properties for saving the survey builder changes to local storage
  private surveyAttendFormSubmitSource = new Subject<{surveyData: ISurvey, questionForm: FormGroup[]}>();
  public surveyAttendFormSubmit$ = this.surveyAttendFormSubmitSource.asObservable();

  // properties for changing tab to preview survey after create survey success response
  public previewSurveyTriggerSource = new Subject<{message: string, survey_id: number, url_code: string}>();
  public previewSurveyTrigger$ = this.previewSurveyTriggerSource.asObservable();

  // properties for changing survey steps
  public onSurveyStepChangeSource = new Subject<SurveyTabStatus>();
  public onSurveyStepChange$ = this.onSurveyStepChangeSource.asObservable();

  constructor() { }


  /**
   * Method to duplicate question data
   * @param data form data
   */
  onSurveyQuestionDuplicate(
    surveyId: string | number,
    pageId: string | number,
    questionId: string | number,
    question: IQuestion
  ) {
    // Triggering subscription
    this.surveyQuestionDuplicateSource.next({ surveyId, pageId, questionId, question });
  }


  /**
   * Method to pass form data
   * @param data form data
   */
  onSurveyBuilderFormSubmit() {
    // Triggering subscription
    this.surveyBuilderDataSource.next();
  }

  /**
   * Method to delete question
   * @param data form data
   */
  onSurveyBuilderQuestionDelete(
    surveyId: string | number,
    pageId: string | number,
    questionId: string | number
  ) {
    // Triggering subscription
    this.surveyQuestionDeleteSource.next({ surveyId, pageId, questionId });
  }

  /**
   * Method to add a question
   * @param data form data
   */
  onSurveyBuilderQuestionAdd(questionType) {
    // Triggering subscription
    this.surveyQuestionAddSource.next(questionType);
  }

  /**
   * Method to store survey edit changes to local storage
   */
  onSurveyBuilderChanges() {
    // Triggering subscription
    this.surveyBuilderChangeSource.next();
  }

  /**
   * Method to store survey edit changes to local storage
   */
  onSurveyDesignPageChanges(data = {}) {
    // Triggering subscription
    this.surveyDesignChangeSource.next(data);
  }

  onSurveyAttendFormSubmit(surveyData: ISurvey, questionForm: FormGroup[]) {
    this.surveyAttendFormSubmitSource.next({surveyData, questionForm});
  }

}
