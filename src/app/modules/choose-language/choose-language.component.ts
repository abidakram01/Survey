import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ISurveyType } from 'src/app/shared/interfaces/ISurveyType';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { environment as env } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SurveyService } from 'src/app/shared/services/survey.service';
import { ISurvey } from 'src/app/shared/interfaces/ISurvey';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';
import { LanguageTranslationService } from 'src/app/shared/services/language-translation.service';
import { ViewRef_ } from '@angular/core/src/view';


@Component({
  selector: 'app-choose-language',
  templateUrl: './choose-language.component.html',
  styleUrls: ['./choose-language.component.css']
})
export class ChooseLanguageComponent implements OnInit {
  public surveyLanguageDownDownStatus = false;

  // Property to hold chosen language
  public language: any;
 // Property to show current selected value in drop down
  public selectedLanguageType = 'Select';
  public surveyID: number;
  public surveyData: ISurvey;
  public surveyLanguageForm: FormGroup;
  get surveyLanguageControl() { return this.surveyLanguageForm.get('surveyLanguage'); }
  public surveyLanguageList: {id: number, name_ar: string, name_en: string, status: boolean}[];

  constructor(
   private localStorage: LocalStorage,
    private surveyService: SurveyService,
    private router: Router,
    private route: ActivatedRoute,
    private languageTranslationService: LanguageTranslationService,
    private cdr: ChangeDetectorRef,
) {
  // Setting language setting from local storage
  this.localStorage.getItem<string>('language').subscribe(
    (language: string) => {
      if (language) {
        this.language = language;
      } else {
        this.language = env.defaultLanguage;
      }
    },
    (error) => console.error(error)
  );

  // Subscribing to the language changes
  this.languageTranslationService.languageTranslation$
  .subscribe(
    (language) => {
      this.language = language;
      this.detectChanges();
    }
  );

  this.surveyLanguageForm = new FormGroup({
    surveyLanguage: new FormControl('', Validators.required),
  });
}

  ngOnInit() {
  // Gets the master data
  this.localStorage.getItem<any>('master').subscribe(
    (masterData: any) => {
      if (masterData) {
        this.surveyLanguageList = masterData.languages;
        if (this.route.snapshot.params.hasOwnProperty('id')) {
          this.surveyID = this.route.snapshot.params['id'];
         }
      }
    }
  );
  }
/**
   * Survey type form submit event
   */
  onSurveyTypeFormSubmit() {
    if (this.surveyLanguageForm.valid) {
      // this.surveyData.survey_language = this.surveyLanguageForm.get('surveyLanguage').value;
      // // Save to local storage
      // this.localStorage.setItemSubscribe('survey', this.surveyData);
      // Save survey and redirect user to survey builder page
      this.router.navigateByUrl('/survey/attend/' + this.surveyID);

      } else {
      Object.keys(this.surveyLanguageForm.controls).forEach(field => {
        const control = this.surveyLanguageForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  /**
   * To expand/collapse the survey category drop-down
   */
  toggleDownDown(type: string) {
    switch (type) {
      case 'language':
        this.surveyLanguageDownDownStatus = this.surveyLanguageDownDownStatus ? false : true;
        break;
    }
  }

  /**
   * Method to update value of the survey type form value
   * @param surveyType Survey Type data
   */
  onSurveyDropDownSelect(type, data) {
    switch (type) {
      case 'language':
        this.selectedLanguageType = data['name_' + this.language];
        this.surveyLanguageForm.patchValue({
          surveyLanguage: data.id
        });
        break;
    }
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
