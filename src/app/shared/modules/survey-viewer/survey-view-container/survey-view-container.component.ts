import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewEncapsulation,
  Input,
  ChangeDetectionStrategy,
  Renderer2,
} from '@angular/core';
import { ISurvey } from 'src/app/shared/interfaces/ISurvey';
import { QuestionType } from 'src/app/shared/enum/QuestionType';
import { IPage } from 'src/app/shared/interfaces/IPage';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';
import { ViewRef_ } from '@angular/core/src/view';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { environment as env } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SurveyDataService } from 'src/app/shared/services/survey-data.service';
import { LanguageTranslationService } from 'src/app/shared/services/language-translation.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { IWinSurvey } from 'src/app/shared/interfaces';
import { CheckboxComponent } from '../checkbox/checkbox.component';

declare var $: any;

@Component({
  selector: 'app-survey-view-container',
  templateUrl: './survey-view-container.component.html',
  styleUrls: ['./survey-view-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SurveyViewContainerComponent implements OnInit {
  @Input()
  public surveyData: ISurvey;

  @Input()
  public questionForm: FormGroup[];

  // To disable form after submit
  public  surveyFormSubmitted = false;

  public winSurveyForm = new FormGroup ({
    user_type: new FormControl('guest'),
    first_name: new FormControl('ffff'),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9\+\-\s]{5,20}$')])
  });

  public questionType = QuestionType;
  public languageDropDownStatus = false;
  public language: any;
  public isManageSurvey = false;
  public userData: any;
  i = 0;

  public staticImageUrl = null;

  constructor(
    private surveyDataService: SurveyDataService,
    private languageTranslationService: LanguageTranslationService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private localStorage: LocalStorage,
    private router: Router,
    private authService: AuthenticationService,
    private renderer: Renderer2
    ) {
    // Gets survey data
    this.isManageSurvey = this.router.url.includes('manage');
    }

  ngOnInit() {


    // $(document).ready(function() {
    //   $(window).scroll(function() {
    //     if ($(this).scrollTop() > 0) {
    //       $('header').css('opacity', 0.8);
    //     } else {
    //       $('header').css('opacity', 1);
    //     }
    //   });
    // });


   // document.getElementById("myDIV").style.opacity = "0.5";
    // Gets logged in user data
    this.authService.getMasterData().subscribe(
      (master: any) => {
        if (master && master.hasOwnProperty('static_file_url_prefix')) {
          this.staticImageUrl = master.static_file_url_prefix;
        }
        if (master && master.hasOwnProperty('languages')) {
          // Sets Survey language from survey data else default language
          if (
            this.surveyData &&
            this.surveyData.hasOwnProperty('survey_language') &&
            this.surveyData.survey_language
          ) {
            const surveyLanguage = master.languages.find((langData: any) => langData.id === +this.surveyData.survey_language);
            if (surveyLanguage && surveyLanguage.hasOwnProperty('name_en')) {
              if (surveyLanguage.name_en.toLowerCase() === 'english') {
                this.language = 'en';
              } else {
                this.language = 'ar';
              }
            } else {
              this.language = this.surveyData.survey_language;
            }
          } else {
            this.language = env.defaultLanguage;
          }
          // Translate page if user data collection form is enabled and guest user
          if (!this.isManageSurvey) {
            this.translate.use(this.language);
          }

          if (this.language === 'en') {
            this.renderer.removeClass(document.body, 'style-arabic');
          } else {
            this.renderer.addClass(document.body, 'style-arabic');
          }
          this.detectChanges();
        }
      }
    );

    if (this.surveyData) {

      // Gets logged in user data
      this.localStorage.getItem<string>('userData').subscribe(
        (user: any) => {
          if (user) {
            this.userData = user;
            this.detectChanges();
          }
        }
      );
    }





  }// oninit

    type(question) {

    const idd = Number($(document.activeElement).closest('div').attr('id'));

    const newid = String(1 + idd);
    console.log(idd);
    console.log(newid);
 if (newid) {

  document.getElementById(newid).scrollIntoView({

    behavior: 'smooth',
    block: 'center',
  });
 }



 // console.log($(document.activeElement)[0].value.length);

    }





  /**
   * Survey submit click event
   * @param event Form submit event
   */
  onSurveyFormSubmit(event) {
    event.preventDefault(); console.log(this.surveyData); console.log(this.winSurveyForm);
    this.surveyData.user_info = this.userData ? this.userData : this.winSurveyForm.value;
    this.surveyData.user_type = this.userData ? 'user' : 'guest';
    // let data = this.surveyData;
    // data.user_info = {};
    // if(this.userData){
    //   data.user_info.email = this.userData.email;
    //   data.user_info.user_type = 'user';
    //   this.surveyData.user_info.first_name = this.userData.first_name;
    //   this.surveyData.user_info.last_name = this.userData.last_name;
    //   this.surveyData.user_info.phone = '';
    // }
    // else{
    //   data.user_info.email = this.winSurveyForm.get('email').value;
    //   data.user_info.user_type = 'guest';
    //   data.user_info.first_name = this.winSurveyForm.get('first_name').value;
    //   data.user_info.last_name = this.winSurveyForm.get('last_name').value;
    //   data.user_info.phone = this.winSurveyForm.get('phone').value;
    // }
    // console.log(data);
    // Win survey form validation
    if (this.surveyData.get_user_data && !this.userData && this.winSurveyForm.invalid) {
      Object.keys(this.winSurveyForm.controls).forEach(field => {
        const control = this.winSurveyForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    } else { console.log(this.surveyData);
      this.surveyFormSubmitted = true;
      this.surveyDataService.onSurveyAttendFormSubmit(
        this.surveyData,
        this.questionForm
      );
      // console.log('Success');
    }
  }

  /**
   * Survey skip button click event
   */
  skipSurvey() {
    this.winSurveyForm.reset();
    this.questionForm.forEach(
      (questionGroup: FormGroup) => questionGroup.reset()
    );
    // Re-direct user to home on skip
    this.router.navigateByUrl('/');
  }

  /**
   * Function called in ngFor to track items in the survey array
   * https://angular.io/api/core/TrackByFunction
   * @param index Current loop index
   * @param item Current survey data
   */
  surveyTrackByFn(index: number, survey: ISurvey) {
    return survey.id;
  }

  /**
   * Function called in ngFor to track items in the page array
   * https://angular.io/api/core/TrackByFunction
   * @param index Current loop index
   * @param item Current page data
   */
  pageTrackByFn(index: number, page: IPage) {
    return page.order;
  }

  /**
   * Function called in ngFor to track items in the question array
   * https://angular.io/api/core/TrackByFunction
   * @param index Current loop index
   * @param item Current question index
   */
  questionTrackByFn(index: number, question: IQuestion) {

    return question.order;
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


  // detect() {


  // $('.type').focus(function() {

  //   alert('hello');
  // });

  // }

}
