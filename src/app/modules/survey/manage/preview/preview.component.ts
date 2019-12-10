import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { ISurvey } from 'src/app/shared/interfaces/ISurvey';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ViewRef_ } from '@angular/core/src/view';
import { SurveyService } from 'src/app/shared/services/survey.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PreviewComponent implements OnInit {
  public surveyData: ISurvey;
  public questionsFrom: any;

  constructor(private cdr: ChangeDetectorRef, private localStorage: LocalStorage, private surveyService: SurveyService) {}

  ngOnInit() {
    // Getting survey data from local storage
    this.localStorage.getItem<ISurvey>('survey').subscribe((surveyData: ISurvey) => {
      if (surveyData) {
        this.surveyData = surveyData;
      } else {
        this.surveyData = this.surveyService.getNewSurvey();
      }
      // TODO: Phase 1: Since we have only one page,
      // get the first page.
      // IMPORTANT: Need to change this when multi page is introduced
      const questionData = this.surveyData.pages[0].questions;
      this.questionsFrom = this.surveyService.getQuestionForm(questionData);
      this.detectChanges();
    });
  }

  ngAfterViewInit() {
    // Called after when the component's view has been initialized.
    // detach the change detectors after change detection has been
    // performed for the first time
    this.cdr.detach();
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
