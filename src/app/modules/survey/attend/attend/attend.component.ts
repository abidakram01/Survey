import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SurveyService } from 'src/app/shared/services/survey.service';
import { ISurvey } from 'src/app/shared/interfaces/ISurvey';
import { FormGroup } from '@angular/forms';
import { ViewRef_ } from '@angular/core/src/view';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyDataService } from 'src/app/shared/services/survey-data.service';
import { AlertComponent } from 'src/app/shared/modules/message/alert/alert.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import { LanguageTranslationService } from 'src/app/shared/services/language-translation.service';

@Component({
  selector: 'app-attend',
  templateUrl: './attend.component.html',
  styleUrls: ['./attend.component.css']
})
export class AttendComponent implements OnInit {
  public surveyData: ISurvey;
  public surveyForm: FormGroup[];
  public isTouched = false;
  public questionsFrom;
  public surveyMessages = {};

  constructor(
    private surveyService: SurveyService,
    private surveyDataService: SurveyDataService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private translate: TranslateService,
    private languageTranslationService: LanguageTranslationService,
  ) {
    const surveyId = this.route.snapshot.params['id'];
    // Gets survey data
    this.surveyService.getSurvey(surveyId)
    .subscribe(
      (surveyData: ISurvey) => {
        this.surveyData = surveyData;
        if(this.surveyData){
        // TODO: Phase 1: Since we have only one page,
        // get the first page.
        // IMPORTANT: Need to change this when multi page is introduced
        const questionData = surveyData.pages[0].questions;
        this.questionsFrom = this.surveyService.getQuestionForm(questionData);
        }
        else{
          this.router.navigate(['/not-found']);
        }
      }
    );

    this.languageTranslationService.languageTranslation$.subscribe(language => {
      this.getSurveyMessages();
    });

    // Listing to survey form submit observable
    this.surveyDataService.surveyAttendFormSubmit$.subscribe(
      (surveyFormData: {surveyData: ISurvey, questionForm: FormGroup[]}) => {
        // Save survey
        this.surveyService.answerSurvey(
          surveyFormData.surveyData,
          surveyFormData.questionForm,
          surveyId
        ).subscribe(
          (res) => {
            // Survey attend success alert
            const modalRef = this.modalService.open(AlertComponent, { centered: true});
            // Redirect user to home when survey success modal is closed
            modalRef.result.then(() => this.router.navigate(['/survey/thankyou']));
            modalRef.componentInstance.data = {
              title: this.surveyMessages['design_survey.success'],
              message: this.surveyMessages['survey.survey_completed_messsage']
            };
          },
          (err) => {
            // Survey attend error alert
            const modalRef = this.modalService.open(AlertComponent, { centered: true });
            let errorMessage = this.surveyMessages['server_error.title'] + this.surveyMessages['server_error.description'];
            errorMessage += this.surveyMessages['server_error.description'];
            modalRef.componentInstance.data = {
              title: this.surveyMessages['server_error.heading'],
              message: errorMessage
            };
          }
        );
      }
    );

  }



  ngOnInit() {
    this.getSurveyMessages();
  }

  // Method to get alert message translations
  getSurveyMessages() {
    // Calling translate service to get translations of given keys
    this.translate.get([
      'survey.survey_completed_messsage',
      'design_survey.success',
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
