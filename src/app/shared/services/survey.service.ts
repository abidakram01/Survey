import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';

import { environment as env } from './../../../environments/environment';
import { ISurvey } from '../interfaces/ISurvey';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { QuestionType } from '../enum/QuestionType';
import { IQuestion } from '../interfaces/IQuestion';
import { IQAnswer } from '../interfaces/IQAnswer';
import { IValue } from '../interfaces/IValue';
import { map } from 'rxjs/operators';
import { UniqueIdHelper } from '../helpers/unique-Id-helper';
import { SurveyStatus } from '../enum/SurveyStatus';

@Injectable()
export class SurveyService {
  public uniqueIDHelper = new UniqueIdHelper();
   HttpUploadOptions = {
    headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
  }
  constructor(private http: HttpClient) { }

  createSurvey(surveyData: ISurvey, userId: number) {
    const url = env.getSurveyUrl('POST', { companyId: userId });
    return this.http.post(url, surveyData);
  }

  /**
   * Get a Survey
   * @param id survey id
   */
  getSurvey(id: number) {
    const url = env.getSurveyUrl('GET', { surveyId: id });
    return this.http.get(url);

  }

  /**
   * Gets New empty survey structure
   * @param category Survey Category
   */
  getNewSurvey(category = 'win'): ISurvey {
    const surveyStatus = SurveyStatus;
    // Creating empty survey object
    return {
      component_id: this.uniqueIDHelper.getUniqueId(),
      name: null,
      category: {
        category: category,
        status: true
      },
      status: surveyStatus.active,
      pages: [
        {
          title: '',
          component_id: this.uniqueIDHelper.getUniqueId(),
          questions: [],
          order: 0,
        }
      ],
    };
  }

  /**
   * Generate survey form
   */
  getQuestionForm(questionData) {
    const questionType = QuestionType;
    const form = [];

    questionData.forEach((question, index) => {
      let data = null;
      switch (question.question_type.question_type) {
        case questionType.singleInput:
          data = this.getSingleInputForm(question);
          break;
        case questionType.checkbox:
          data = this.getCheckboxForm(question);
          break;
        case questionType.multipleChoice:
          data = this.getMultipleChoiceForm(question);
          break;
        case questionType.dropdown:
          data = this.getDropdownForm(question);
          break;
        case questionType.comment:
          data = this.getCommentForm(question);
          break;
        case questionType.rating:
          data = this.getRatingForm(question);
          break;
        default:
          break;
      }
      if (data) {
        form.push(data);
      }
    });
    return form;
  }

  getSingleInputForm(question) {
    return new FormGroup({
      component_id: new FormControl(question.component_id),
      questionType: new FormControl(question.question_type.question_type),
      name: new FormControl(question.question),
      order: new FormControl(0),
      values: new FormArray([
        new FormGroup({
          name: new FormControl(''),
          value: new FormControl(''),
          component_id: new FormControl(''),
          order: new FormControl(0),
        })
      ]),
    });
  }

  getCheckboxForm(question: IQuestion) {
    const values = new FormArray([]);

    question.options.forEach(
      (option, index) => {
        const radioBtnFg = {
          name: new FormControl(option.name),
          value: new FormControl(option.value),
          component_id: new FormControl(option.component_id),
          order: new FormControl(0),
          'checkbox-value': new FormControl(false)
        };
        const data = new FormGroup(radioBtnFg);
        values.push(data);
      }
    );

    return new FormGroup({
      component_id: new FormControl(question.component_id),
      questionType: new FormControl(question.question_type.question_type),
      name: new FormControl(question.question),
      order: new FormControl(0),
      values
    });
  }

  getMultipleChoiceForm(question: IQuestion) {
    return new FormGroup({
      component_id: new FormControl(question.component_id),
      questionType: new FormControl(question.question_type.question_type),
      name: new FormControl(question.question),
      order: new FormControl(0),
      values: new FormControl('')
    });
  }

  getDropdownForm(question) {
    return new FormGroup({
      component_id: new FormControl(question.component_id),
      questionType: new FormControl(question.question_type.question_type),
      name: new FormControl(question.question),
      order: new FormControl(0),
      values: new FormArray([
        new FormGroup({
          name: new FormControl(''),
          value: new FormControl(''),
          component_id: new FormControl(''),
          order: new FormControl(0),
        })
      ]),
    });
  }

  getCommentForm(question) {
    return new FormGroup({
      component_id: new FormControl(question.component_id),
      questionType: new FormControl(question.question_type.question_type),
      name: new FormControl(question.question),
      order: new FormControl(0),
      values: new FormArray([
        new FormGroup({
          name: new FormControl(''),
          value: new FormControl(''),
          order: new FormControl(0),
          component_id: new FormControl('')
        })
      ]),
    });
  }

  getRatingForm(question: IQuestion) {
    return new FormGroup({
      component_id: new FormControl(question.component_id),
      questionType: new FormControl(question.question_type.question_type),
      name: new FormControl(question.question),
      order: new FormControl(0),
      values: new FormControl('')
    });
  }

  /**
   * Combine survey data and question answers and set it to the server
   */
  answerSurvey(surveyData: ISurvey, questionForm: FormGroup[], surveyId: number) {
    const finalSurveyData = this.getSurveyAnswers(surveyData, questionForm);
    const url = env.getAttendSurveyUrl(surveyId);
    return this.http.post(url, finalSurveyData);
  }

  /**
   * Method extracts all the answer data from and
   * added it to the survey data object
   * @param surveyData Survey data object
   * @param questionForm Survey question answer form
   */
  getSurveyAnswers(surveyData: ISurvey, questionForm: FormGroup[]) {
    const questionType = QuestionType;
    const questionData = surveyData.pages[0].questions;

    questionData.forEach((question: IQuestion, index) => {
      // Gets question index
      const qIndex = questionForm.findIndex(
        (qa: FormGroup) => {
          return qa.get('component_id').value === question.component_id;
        }
      );
      // Question Answer Form
      const qAnswerForm = questionForm[qIndex];

      switch (question.question_type.question_type) {
        case questionType.singleInput:
          question.answer = this.getSingleInputAnswer(qAnswerForm);
          break;
        case questionType.checkbox:
          question.answer = this.getCheckboxAnswer(qAnswerForm);
          break;
        case questionType.multipleChoice:
          question.answer = this.getMultipleChoiceAnswer(qAnswerForm);
          break;
        case questionType.dropdown:
          question.answer = this.getDropDownAnswer(qAnswerForm);
          break;
        case questionType.comment:
          question.answer = this.getCommentAnswer(qAnswerForm);
          break;
        case questionType.rating:
          question.answer = this.getRatingAnswer(qAnswerForm);
          break;
      }
    });

    // if (surveyData.category.category === 'win') {
    //   surveyData.user_type = 'guest';
    //   surveyData.user_info = {
    //     user_type: 'guest',
    //     first_name: 'test',
    //     last_name: 'test',
    //     email: 'test',
    //     phone: 'test'
    //   };
    // }

    surveyData.company_id = surveyData.company_info.user_id;

    return surveyData;
  }

  /**
   * Gets the answer for the single input question
   */
  getSingleInputAnswer(answerForm: FormGroup): IQAnswer {
    const values: IValue[] = answerForm.get('values').value;
    const answer: IQAnswer = {
      component_id: answerForm.get('component_id').value,
      name: answerForm.get('name').value,
      order: 0,
      values: values
    };
    return answer;
  }

  /**
   * Gets the answer for the checkbox question
   */
  getCheckboxAnswer(answerForm: FormGroup): IQAnswer {
    const values: IValue[] = answerForm.get('values').value
      .filter(
        (value: IValue) => value['checkbox-value'] === true
      );

    return {
      component_id: answerForm.get('component_id').value,
      name: answerForm.get('name').value,
      order: 0,
      values
    };
  }

  /**
   * Gets the answer for the multiple choice question
   */
  getMultipleChoiceAnswer(answerForm: FormGroup): IQAnswer {
    let answer = answerForm.get('values').value;
    if (answer) {
      answer = [answer];
    } else {
      answer = [];
    }
    return {
      component_id: answerForm.get('component_id').value,
      name: answerForm.get('name').value,
      order: 0,
      values: answer
    };
  }

  /**
   * Gets the answer for the dropdown question
   */
  getDropDownAnswer(answerForm: FormGroup): IQAnswer {
    const values: IValue[] = answerForm.get('values').value
      .map(
        (value: IValue) => value['value']
      );

    return {
      component_id: answerForm.get('component_id').value,
      name: answerForm.get('name').value,
      order: 0,
      values: values
    };
  }

  /*
   * Gets the answer for the comment question
   */
  getCommentAnswer(answerForm: FormGroup): IQAnswer {
    const values: IValue[] = answerForm.get('values').value;
    const answer: IQAnswer = {
      component_id: answerForm.get('component_id').value,
      name: answerForm.get('name').value,
      order: 0,
      values: values
    };
    return answer;
  }

  /**
   * Gets the answer for the rating question
   */
  getRatingAnswer(answerForm: FormGroup): IQAnswer {
    let answer = answerForm.get('values').value;
    if (answer) {
      answer = [answer];
    } else {
      answer = [];
    }
    return {
      component_id: answerForm.get('component_id').value,
      name: answerForm.get('name').value,
      order: 0,
      values: answer
    };
  }

  /**
   * Get all Surveys
   */
  getAllSurveys(id) {
    const url = env.getAllSurveysUrl(id);
    return this.http.get(url);
  }

  deleteSurvey(surveyId: number) {
    const url = env.apiUrl.deleteSurvey(surveyId);
    return this.http.get(url);
  }

  disableSurvey(surveyId: number) {
    const url = env.apiUrl.disableSurvey(surveyId);
    return this.http.get(url);
  }

  updateSurvey(surveyData: ISurvey, surveyId: any) {
    const url = env.getSurveyUrl('PUT', { surveyId: surveyId });
    return this.http.put(url, surveyData);
  }


  shareSurveyByEmail(emailIds: string[], surveyId: number, language: string, file :File) {
    console.log(typeof file[0]);
    let data = new FormData();
    
    let obj = {
      'survey_id' : surveyId,
      'email_file' : data.append('email_file', file[0]),
      'survey_type' : 2 ,
      // 'email_ids': emailIds
    }
    console.log(obj)
    // data.append('email_file', file[0]);
    // data.append('survey_id', JSON.stringify(surveyId));
    // data.append('email_ids', JSON.stringify(emailIds));
    // data.append('survey_type', "2");

    const url = env.getEmailSendUrl();
    return this.http.post(url, obj, this.HttpUploadOptions);
  }

}
