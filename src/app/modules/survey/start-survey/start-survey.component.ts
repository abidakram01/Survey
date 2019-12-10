import { IPrize } from 'src/app/shared/interfaces/IPrize';
import { IDurations } from 'src/app/shared/interfaces/IDurations';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ISurveyType } from 'src/app/shared/interfaces/ISurveyType';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { environment as env } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SurveyService } from 'src/app/shared/services/survey.service';
import { ISurvey } from 'src/app/shared/interfaces/ISurvey';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { LanguageTranslationService } from 'src/app/shared/services/language-translation.service';
import { ViewRef_ } from '@angular/core/src/view';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
@Component({
  selector: 'app-start-survey',
  templateUrl: './start-survey.component.html',
  styleUrls: ['./start-survey.component.css']
})
export class StartSurveyComponent implements OnInit {
  // Property used to expand/collapse the drop-down menu
  // public surveyCategoryDownDownStatus = false;
  // public surveyLanguageDownDownStatus = false;
  // public surveydurationDownDownStatus = false;
  // public surveyprizeDownDownStatus = false;
  // public surveycountryDownDownStatus = false;
  // Property to store survey types
  public surveyTypes: ISurveyType[];
  newSurveyData: any = { name: {}, description: {} };
  // Property to hold chosen language
  public language: string = "en";

  // Property to show current selected value in drop down
  // public selectedSurveyType = 'Select';
  // public selectedLanguageType = 'Select';
  // public selectedDurationType = 'Select';
  // public selectedPrizesType = 'Select';

  public surveyID: number;
  public isEdit = false;
  public surveyData: ISurvey;
  public selected_prize = [];
  public surveyTypeForm: FormGroup;

  @ViewChild('surveyExpiryRef')
  public surveyExpiryRef: NgbDatepicker;

  // get surveyTypeControl() { return this.surveyTypeForm.get('surveyType'); }
  // get surveyNameControl() { return this.surveyTypeForm.get('surveyName'); }
  // get surveyLanguageControl() { return this.surveyTypeForm.get('surveyLanguage'); }
  // get surveyPrizeControl() { return this.surveyTypeForm.get('surveyPrizes'); }
  // get surveyDurationControl() { return this.surveyTypeForm.get('surveyDuration'); }

  public surveyCategoryList: { id: number, name_ar: string, name_en: string, status: boolean }[];
  public surveyLanguageList: { id: number, name_ar: string, name_en: string, status: boolean }[];
  public surveyPrizesList: { id: number, name_ar: string, name_en: string, status: boolean, checked: boolean }[];
  public surveyDurationList: { id: number, name_ar: string, name_en: string, status: boolean }[];
  public countryList: { id: number, name_ar: string, name_en: string, status: boolean }[];
  constructor(
    private localStorage: LocalStorage,
    private surveyService: SurveyService,
    private router: Router,
    private route: ActivatedRoute,
    private languageTranslationService: LanguageTranslationService,
    private cdr: ChangeDetectorRef,
    private authService: AuthenticationService
  ) {
    // // Gets the survey types
    // this.localStorage.getItem<any>('survey_types').subscribe(
    //   (surveyTypes: any) => {
    //     this.surveyTypes = surveyTypes;
    //     // console.log(this.surveyTypes);
    //   }
    // );

    // Setting language setting from local storage
    this.localStorage.getItem<string>('language').subscribe(
      (language: string) => {
        //console.log("KK");
        if (language) {
          this.language = language;
        } else {
          this.language = env.defaultLanguage;
        }
        // console.log(this.language, "this.language")
      },
      (error) => console.error(error)
    );

    // Subscribing to the language changes
    this.languageTranslationService.languageTranslation$
      .subscribe(
        (language) => {
          // console.log(language, "JJJJJ")
          this.language = language;
          this.detectChanges();
        }
      );

    // this.surveyTypeForm = new FormGroup({
    //   surveyName: new FormControl('', Validators.required),
    //   surveyType: new FormControl('', Validators.required),
    //   surveyPrizes: new FormControl('', Validators.required),
    //   surveyDuration: new FormControl('', Validators.required),
    //   getUserData: new FormControl(false),
    //   surveyLanguage: new FormControl('', Validators.required),
    //   surveyExpiry: new FormControl(''),
    // });
  }

  ngOnInit() {
    // Gets the master data

    this.authService.getMasterData().subscribe(
      (master: any) => {
        this.localStorage.setItemSubscribe('master', master);
        this.surveyCategoryList = master.survey_categories;
        this.surveyLanguageList = master.languages;
        this.surveyDurationList = master.durations;
        this.countryList = master.countries;
        this.surveyPrizesList = master.prizes;
        this.surveyTypes = master.survey_types;

        this.localStorage.getItem<any>('master').subscribe(
          (masterData: any) => {
            if (masterData) {
              //this.surveyDurationList = masterData.durations;
              //this.surveyPrizesList = masterData.prizes;
              //this.surveyLanguageList = masterData.languages;
              if (this.route.snapshot.params.hasOwnProperty('id')) {
                this.surveyID = this.route.snapshot.params['id'];
                this.isEdit = true;
              }

              if (this.isEdit) {
                this.surveyService.getSurvey(this.surveyID)
                  .subscribe(
                    (surveyData: any) => {
                      if (surveyData) {
                        console.log('surveyData', surveyData.duration_id);
                        this.newSurveyData["country"] = surveyData.country.id;
                        this.newSurveyData["is_private"] = surveyData.is_private;
                        this.newSurveyData["survey_type"] = surveyData.survey_type.id;
                        this.newSurveyData["description"] = surveyData.description;
                        this.newSurveyData["name"] = surveyData.name;
                        this.newSurveyData["id"] = surveyData.id;
                        this.newSurveyData["duration"] = surveyData.duration;
                        this.newSurveyData["category"] = surveyData.category.id;
                        //language and prize
                        const surveyType = surveyData.survey_type;
                        // const durationType = surveyData.duration;
                        // this.selectedSurveyType = surveyType['name_' + this.language];
                        let surveyLanguage = null;
                        let surveyDuration = null;
                        let surveyPrizes = null;
                        if (surveyData.hasOwnProperty('prize_id') && surveyData.prize_id) {
                          surveyPrizes = this.surveyPrizesList.find((prizeData: any) => prizeData.id === +surveyData.prize_id);
                          // this.selectedPrizesType = surveyPrizes['name_' + this.language];
                        }
                        if (surveyData.hasOwnProperty('duration_id') && surveyData.duration_id) {
                          console.log("dur", surveyData.duration_id)
                          surveyDuration = this.surveyDurationList.find((durationData: any) => durationData.id === +surveyData.duration_id);
                          // this.selectedDurationType = surveyDuration['name_' + this.language];
                        }
                        if (surveyData.hasOwnProperty('survey_language') && surveyData.survey_language) {
                          surveyLanguage = this.surveyLanguageList.find((langData: any) => langData.id === +surveyData.survey_language);
                          // this.selectedLanguageType = surveyLanguage['name_' + this.language];
                        }

                        let expiryDate = new Date();
                        let expiry = null;
                        if (surveyData.hasOwnProperty('expiry_date')) {
                          expiryDate = new Date(surveyData.expiry_date.$date);
                          expiry = { year: expiryDate.getFullYear(), month: expiryDate.getMonth() + 1, day: expiryDate.getDate() };
                        }

                        // To change date in the date-picker
                        if (this.surveyExpiryRef) {
                          this.surveyExpiryRef.navigateTo({ year: expiryDate.getFullYear(), month: expiryDate.getMonth() + 1 });
                        }

                        this.surveyTypeForm.patchValue({
                          surveyName: surveyData.name,
                          surveyType: +surveyType.id,
                          surveyLanguage: surveyLanguage ? +surveyLanguage.id : null,
                          surveyDuration: surveyDuration ? +surveyDuration.id : null,
                          surveyPrizes: surveyPrizes ? +surveyPrizes.id : null,
                          getUserData: surveyData.get_user_data,
                          surveyExpiry: expiry
                        });
                      }
                    }
                  );
              } else {
                this.surveyData = this.surveyService.getNewSurvey();
              }
            }
          }
        );
      })
  }

  /**
   * Survey type form submit event
   */
  // onSurveyTypeFormSubmit() {
  //   if (this.surveyTypeForm.valid) {
  //     this.surveyData.name = this.surveyTypeForm.get('surveyName').value;
  //     this.surveyData.survey_type = this.surveyTypeForm.get('surveyType').value;
  //     this.surveyData.survey_language = this.surveyTypeForm.get('surveyLanguage').value;
  //     this.surveyData.duration_id = this.surveyTypeForm.get('surveyDuration').value;
  //     this.surveyData.prize_id = this.surveyTypeForm.get('surveyPrizes').value;
  //     this.surveyData.prize_id = this.selected_prize.toString();
  //     this.surveyData.get_user_data = this.surveyTypeForm.get('getUserData').value;
  //     let expiry = this.surveyTypeForm.get('surveyExpiry').value;
  //     expiry = new Date(expiry.year, expiry.month - 1, expiry.day);
  //     this.surveyData.expiry_date = Math.trunc(expiry.getTime() / 1000);
  //     // Save to local storage

  //     console.log("سسسس" + this.surveyData.duration_id);
  //     this.localStorage.setItemSubscribe('survey', this.surveyData);

  //     // Save survey and redirect user to survey builder page
  //     if (this.isEdit) {
  //       this.updateSurvey();
  //     } else {
  //       this.createSurvey();
  //       // console.log("تاريخ"+this.surveyData.expiry_date);

  //     }
  //   } else {
  //     Object.keys(this.surveyTypeForm.controls).forEach(field => {
  //       const control = this.surveyTypeForm.get(field);
  //       control.markAsTouched({ onlySelf: true });
  //     });
  //   }
  // }
  onSurveyTypeFormSubmit() {
    //if (this.surveyTypeForm.valid) {
    console.log("سسسس" + this.newSurveyData);
    this.newSurveyData.prize = [];
    this.surveyPrizesList.forEach(obj => {
      if (obj.checked)
        this.newSurveyData.prize.push(obj.checked)
    })
    this.localStorage.setItemSubscribe('survey', this.newSurveyData);
    // Save survey and redirect user to survey builder page

    if (this.isEdit) {
      this.updateSurvey();
    } else {
      this.createSurvey();
    }
    // } else {
    //   Object.keys(this.surveyTypeForm.controls).forEach(field => {
    //     const control = this.surveyTypeForm.get(field);
    //     control.markAsTouched({ onlySelf: true });
    //   });
    // }

  }
  /**
   * To expand/collapse the survey category drop-down
   */
  // toggleDownDown(type: string) {
  //   switch (type) {
  //     case 'language':
  //       this.surveyLanguageDownDownStatus = this.surveyLanguageDownDownStatus ? false : true;
  //       break;
  //     case 'category':
  //       this.surveyCategoryDownDownStatus = this.surveyCategoryDownDownStatus ? false : true;
  //       break;
  //     case 'duration':
  //       this.surveydurationDownDownStatus = this.surveydurationDownDownStatus ? false : true;
  //       break;
  //     case 'country':
  //       this.surveycountryDownDownStatus = this.surveycountryDownDownStatus ? false : true;
  //       break;
  //     case 'prize':
  //       this.surveyprizeDownDownStatus = this.surveyprizeDownDownStatus ? false : true;
  //       break;
  //   }
  // }

  /*
   * Method to create survey
   */
  createSurvey() {
    if (!this.newSurveyData.name) {
      this.newSurveyData.name = 'Untitled Survey';
    }
    this.localStorage.getItem<any>('userData').subscribe((data: any) => {
      console.log(data, "User Data");
      this.newSurveyData.created_by = data.user.id;
      this.surveyService
        .createSurvey(this.newSurveyData, data.user.id)
        .subscribe((res: { message: string, survey_id: number, url_code: string }) => {
          console.log("res");
          console.log("result" + this.newSurveyData.duration_id);

          this.newSurveyData.id = res.survey_id;
          this.newSurveyData.url_code = res.url_code;
          // Save to local storage
          this.localStorage.setItemSubscribe('survey', this.newSurveyData);
          this.router.navigateByUrl('/questions' + res.survey_id);
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
        .subscribe((res: { message: string }) => {
          this.router.navigateByUrl('/survey/manage/' + this.surveyData.id);
        });
    });
  }

  /**
   * Method to update value of the survey type form value
   * @param surveyType Survey Type data
   */
  // onSurveyDropDownSelect(type, data) {
  //   switch (type) {
  //     case 'language':
  //       this.selectedLanguageType = data['name_' + this.language];
  //       this.surveyTypeForm.patchValue({
  //         surveyLanguage: data.id
  //       });
  //       break;
  //     case 'category':
  //       this.selectedSurveyType = data['name_' + this.language];
  //       this.surveyTypeForm.patchValue({
  //         surveyType: data.id
  //       });
  //       break;
  //     case 'duration':
  //       this.selectedDurationType = data['name_' + this.language];
  //       this.surveyTypeForm.patchValue({
  //         surveyDuration: data.id
  //       });
  //       break;
  //     case 'prize':
  //       this.selectedPrizesType = data['name_' + this.language];
  //       this.surveyTypeForm.patchValue({
  //         surveyPrizes: data.id
  //       });
  //       break;
  //   }
  // }

  /**
   * To trigger change detection
   */
  detectChanges() {
    if (this.cdr !== null &&
      this.cdr !== undefined &&
      !(this.cdr as ViewRef_).destroyed) {
      this.cdr.detectChanges();
    }
  }

  selectArr(val) {
    if (this.selected_prize.indexOf(val) == -1) {
      this.selected_prize.push(val);
    } else {
      this.selected_prize.splice(this.selected_prize.indexOf(val), 1)
    }

    // setTimeout(()=>{
    //   console.log(this.selected_prize);
    // }, 1000);

  }

}
