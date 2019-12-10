import { Component, OnInit, OnDestroy, ViewChild, ViewChildren, ChangeDetectorRef , Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CropperSettings, ImageCropperComponent } from 'ngx-img-cropper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NavBarService } from '../../../shared/services/nav-bar.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { LanguageTranslationService } from 'src/app/shared/services/language-translation.service';
import { ProfileUpdateService } from 'src/app/shared/services/profile-update.service';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/modules/message/alert/alert.component';
import { IUserProfile } from 'src/app/shared';
import { LocalStorageUpdateService } from 'src/app/shared/services/local-storage-update.service';
import { TranslateService } from '@ngx-translate/core';
import { ViewRef_ } from '@angular/core/src/view';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    public selectLangFlag = 'en';
      public languagedir: any;

  public userForm = new FormGroup({
    title: new FormControl(''),
    gender: new FormControl(''),
    forename: new FormControl(''),
    surname: new FormControl(''),
    dob: new FormControl(''),
    telephone: new FormControl(''),
    status: new FormControl(''),
    nationality: new FormControl(''),
    mobile: new FormControl(''),
    mobile_operator: new FormControl(''),
    town: new FormControl(''),
    personal_email: new FormControl({disabled: true}),
    address: new FormControl(''),
    city: new FormControl(''),
    // province: new FormControl(''),
    country: new FormControl(''),
    education_institute: new FormControl(''),
    education: new FormControl(''),
    education_type: new FormControl(''),
    education_sector: new FormControl(''),
    education_year: new FormControl(''),
    employment_status: new FormControl(''),
    institute_city: new FormControl(''),
    resident_country: new FormControl(''),
     religion: new FormControl(''),
    interests: new FormControl(''),
    tools_technologies: new FormControl(''),
    proficiency: new FormControl(''),
    language: new FormControl(''),
    martial_status: new FormControl(''),
    ethnic: new FormControl(''),
    skills_endorsements: new FormControl(''),
    other_skills: new FormControl('')
  });

  select: Boolean;

  public croppedImage;
  public master;
  public langSelected;
  public useLang: { name: string };
  public langEN = { name: 'name_en' };
  public langAR = { name: 'name_ar' };
  public langModalStatus = false;
  public profileData;
  public userData;
  public userID;
  public langDisplayClass = 'hide';
  public genderData = 'checked';
  public expandColumn: any = 'personal';

  data: any;
  @ViewChild('modalContent')
  modalContent: string;

  @ViewChildren('cropper', undefined)
  cropper: ImageCropperComponent;

  cropperSettings: CropperSettings;

  private accountNavBtnActionUnsubscribe: Subject<void> = new Subject();

  public surveyMessages = {};

  constructor(
    private navBarService: NavBarService,
    private modalService: NgbModal,
    private languageTranslationService: LanguageTranslationService,
    private router: Router,
    private updateService: ProfileUpdateService,
    private localStorage: LocalStorage,
    private localStorageUpdate: LocalStorageUpdateService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2

  ) {
    this.localStorage.getItem<string>('master').subscribe(
      master => {
        this.master = master;
       },
      error => console.warn(error)
    );

    // this.localStorage.getItem<string>('language').subscribe(
    //   data => {
    //     this.langSelected = data;
    //     // this.useLang = this.langSelected === 'en' ? this.langEN : this.langAR;
    //     this.languageTranslationService.onLanguageChange(this.langSelected);
    //   },
    //   error => console.warn(error)
    // );
        this.localStorage.getItem<string>('language').subscribe(
      (language: string) => {
        this.selectLangFlag = language;
        this.languagedir = language;
        this.languageTranslationService.onLanguageChange(language);
      },
      error => console.warn(error)
    );
  this.localStorageUpdate.localStorage$.subscribe(data => {
      this.localStorage.getItem<string>('language').subscribe(
        (language: string) => {
          this.selectLangFlag = language;
          this.languageTranslationService.onLanguageChange(language);
        },
        error => console.warn(error)
      );
    });
     this.languageTranslationService.languageTranslation$.subscribe(language => {
      this.useLang = language === 'en' ? this.langEN : this.langAR;
      this.selectLangFlag = language;
      this.languagedir = language;
      if (language === 'en') {
        this.renderer.removeClass(document.body, 'style-arabic');
      } else {
        this.renderer.addClass(document.body, 'style-arabic');
      }
      // this.detectChanges();
    });

    this.localStorage.getItem<string>('userData').subscribe(
      (data: any) => {
        this.userID = data.user_id;
        this.updateService.getProfileData(this.userID).subscribe(
          profileData => {
            this.profileData = profileData;
             this.croppedImage = this.profileData.profile_pic;
            // this.userForm.controls['gender'].patchValue(
            //   this.profileData.gender !== null ? this.profileData.gender.toString() : '1');

            this.userForm.controls['title'].patchValue(this.profileData.title !== null ? this.profileData.title : null);
            this.userForm.controls['forename'].patchValue(this.profileData.forename !== null ? this.profileData.forename : null);
            this.userForm.controls['surname'].patchValue(this.profileData.surname !== null ? this.profileData.surname : null);
           this.userForm.controls['gender'].patchValue(this.profileData.gender !== null ? this.profileData.gender : null);
           this.userForm.controls['dob'].patchValue(
            this.profileData.dob !== null ? this.profileData.dob : null
            );
            this.userForm.controls['nationality'].patchValue(
              this.profileData.nationality !== null ? this.profileData.nationality : null
            );
            this.userForm.controls['religion'].patchValue(this.profileData.religion !== null ? this.profileData.religion : null);
           this.userForm.controls['martial_status'].patchValue(
              this.profileData.martial_status !== null ? this.profileData.martial_status : null
            );
            this.userForm.controls['education_institute'].patchValue(
              this.profileData.education_institute !== null ? this.profileData.education_institute : null
            );
            this.userForm.controls['employment_status'].patchValue(
              this.profileData.employment_status !== null ? this.profileData.employment_status : null
            );
            this.userForm.controls['resident_country'].patchValue(
              this.profileData.resident_country !== null ? this.profileData.resident_country : null
            );
           this.userForm.controls['city'].patchValue(this.profileData.city !== null ? this.profileData.city : null);
           this.userForm.controls['language'].patchValue(this.profileData.language !== null ? this.profileData.language : null);

             this.userForm.controls['mobile_operator'].patchValue(
              this.profileData.mobile_operator !== null ? this.profileData.mobile_operator : null
            );
            this.userForm.controls['mobile'].patchValue(this.profileData.mobile !== null ? this.profileData.mobile : null);
            this.userForm.controls['personal_email'].patchValue(
              this.profileData.personal_email !== null ? this.profileData.personal_email : null
            );
           // this.userForm.controls['telephone'].patchValue(this.profileData.telephone !== null ? this.profileData.telephone : null);
            // this.userForm.controls['zip_code'].patchValue(this.profileData.zip_code !== null ? this.profileData.zip_code : null);
            // this.userForm.controls['town'].patchValue(this.profileData.town !== null ? this.profileData.town : null);
            // this.userForm.controls['address'].patchValue(this.profileData.address !== null ? this.profileData.address : null);
            // this.userForm.controls['education'].patchValue(this.profileData.education !== null ? this.profileData.education : null);
            // this.userForm.controls['province'].patchValue(this.profileData.province !== null ? this.profileData.province : null );
            // this.userForm.controls['interests'].patchValue(this.profileData.interests !== null ? this.profileData.interests : null);
            // this.userForm.controls['tools_technologies'].patchValue(
            //   this.profileData.tools_technologies !== null ? this.profileData.tools_technologies : null
            // );
            // this.userForm.controls['proficiency'].patchValue(
              // this.profileData.proficiency !== null ? this.profileData.proficiency : null);
            // this.userForm.controls['ethnic'].patchValue(this.profileData.ethnic !== null ? this.profileData.ethnic : null);
            // this.userForm.controls['skills_endorsements'].patchValue(
            //   this.profileData.skills_endorsements !== null ? this.profileData.skills_endorsements : null
            // );
            // this.userForm.controls['other_skills'].patchValue(
            //   this.profileData.other_skills !== null ? this.profileData.other_skills : null
            // );
            // this.userForm.controls['country'].patchValue(this.profileData.country !== null ? this.profileData.country : null);
            // this.userForm.controls['institute_city'].patchValue(
            //   this.profileData.institute_city !== null ? this.profileData.institute_city : null
            // );
            // this.userForm.controls['education_year'].patchValue(
            //   this.profileData.education_year !== null ? this.profileData.education_year : null
            // );
            // this.userForm.controls['education_type'].patchValue(
            //   this.profileData.education_type !== null ? this.profileData.education_type : null
            // );
            // this.userForm.controls['education_sector'].patchValue(
            //   this.profileData.education_sector !== null ? this.profileData.education_sector : null
            // );

          },
          error => console.warn(error)
        );
      },
      error => console.warn(error)
    );

    this.languageTranslationService.languageTranslation$.subscribe(language => {
      this.useLang = language === 'en' ? this.langEN : this.langAR;
      this.getSurveyMessages();
    });

    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;

    this.cropperSettings.width = 200;
    this.cropperSettings.height = 200;
    this.cropperSettings.croppedWidth = 150;
    this.cropperSettings.croppedHeight = 150;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;

    this.data = {};

    this.navBarService.accountNavBtnAction$.pipe(takeUntil(this.accountNavBtnActionUnsubscribe)).subscribe(modalStatus => {
      if (modalStatus) {
        this.modalService.open(this.modalContent);
      } else {
        this.modalService.dismissAll();
      }
    });
  }

  // Method to get alert message translations
  getSurveyMessages() {
    // Calling translate service to get translations of given keys
    this.translate.get([
      'my_account.profile.profile_success',
      'design_survey.success',
    ]).subscribe(
      (surveyMessages: object) => {
      this.surveyMessages = surveyMessages;
      }
    );
  }

  fileChangeListener($event, cropperComp: ImageCropperComponent) {
    this.cropper = cropperComp;

    const image = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;

    myReader.onloadend = function(loadEvent: any) {
      image.src = loadEvent.target.result;
      image.onload = () => {
        that.cropper.setImage(image);
     };
    };
    myReader.readAsDataURL(file);
  }
  ngOnInit() {
    this.getSurveyMessages();
  }

   ngOnDestroy() {
    this.accountNavBtnActionUnsubscribe.next();
    this.accountNavBtnActionUnsubscribe.complete();
  }

  get forename() {
    return this.userForm.get('forename');
  }
  get title() {
    return this.userForm.get('title');
  }
  get gender() {
    return this.userForm.get('gender');
  }
  get personal_email() {
    return this.userForm.get('personal_email');
  }
  get telephone() {
    return this.userForm.get('telephone');
  }
  get surname() {
    return this.userForm.get('surname');
  }
  get address() {
    return this.userForm.get('address');
  }
  get city() {
    return this.userForm.get('city');
  }
  // get province() { return this.userForm.get('province'); }
  get country() {
    return this.userForm.get('country');
  }
  get status() {
    return this.userForm.get('status');
  }
  get nationality() {
    return this.userForm.get('nationality');
  }
  get mobile() {
    return this.userForm.get('mobile');
  }
  get zip_code() {
    return this.userForm.get('zip_code');
  }
  get town() {
    return this.userForm.get('town');
  }
  get education_institute() {
    return this.userForm.get('education_institute');
  }
  get education() {
    return this.userForm.get('education');
  }
  get education_type() {
    return this.userForm.get('education_type');
  }
  get education_sector() {
    return this.userForm.get('education_sector');
  }
  get education_year() {
    return this.userForm.get('education_year');
  }
  get institute_city() {
    return this.userForm.get('institute_city');
  }
  get resident_country() {
    return this.userForm.get('resident_country');
  }
  get religion() {
    return this.userForm.get('religion');
  }
  get interests() {
    return this.userForm.get('interests');
  }
  get tools_technologies() {
    return this.userForm.get('tools_technologies');
  }
  get proficiency() {
    return this.userForm.get('proficiency');
  }
  get language() {
    return this.userForm.get('language');
  }
  get ethnic() {
    return this.userForm.get('ethnic');
  }
  get skills_endorsements() {
    return this.userForm.get('skills_endorsements');
  }
  get other_skills() {
    return this.userForm.get('other_skills');
  }

  get mobile_operator() {
    return this.userForm.get('mobile_operator');
  }
  get employment_status() {
    return this.userForm.get('employment_status');
  }
  get martial_status() {
    return this.userForm.get('martial_status');
  }
  get dop() {
    return this.userForm.get('dop');
  }
  onFormSubmit() {
    // emit function will pass the current form data to the parent component(create/delete)
    // https://angular.io/api/core/EventEmitter
    if (this.userForm.valid) {
      this.userForm.removeControl('personal_email');
      if (this.croppedImage !== this.profileData.profile_pic) {
        const data = { profile_pic: this.croppedImage };
        Object.assign(this.userForm.value, data);
      }
      this.updateService.updateProfile(this.userForm.value, this.userID).subscribe(
        data => {
          const modalRef = this.modalService.open(AlertComponent, { centered: true});
          modalRef.componentInstance.data = {
            title: this.surveyMessages['design_survey.success'],
            message: this.surveyMessages['my_account.profile.profile_success']
          };
          modalRef.result.then(alert => {
            // Do stuff with respect to closure
            this.localStorage.getItem<string>('userData')
        .subscribe((user: IUserProfile) => {

          user['email'] = data['personal_email'];
          user['first_name'] = data['forename'];
          user['last_name'] = data['surname'];
          user['profile_pic'] = data['profile_pic'];
          user['language_code'] = data['language_code'];
          user['language_id'] = data['language'];

          this.localStorage.setItemSubscribe('userData', user);
          this.localStorage.setItemSubscribe('language', user['language_code']);
          this.localStorageUpdate.onValueChange();
          // console.log( this.userData + "user1");
        });

        },
        error => console.warn(error));

         // console.log(data, 'success');
          // this.router.navigate(['/dashboard']);
        }, // CHANGE THIS!!!!!!!!
        error => {
          console.log(error, 'error');
        }
      );
     // console.log(this.userForm.value, this.croppedImage);
    }
  }

  onSelectClick() {
    this.select = this.select ? false : true;
  }

  onDisplayModal() {
    this.navBarService.displayAccountModal(true);
  }

  saveImage(img, modal) {
    this.croppedImage = img.image;
    modal.close();
  }

  deleteImage(modal) {
    this.croppedImage = '';
    modal.close();
  }

  expandTab(event) {
    if (event.target.id === this.expandColumn) {
      this.expandColumn = '';
    } else {
      this.expandColumn = event.target.id;
    }
  }

  detectChanges() {
    if (this.cdr !== null && this.cdr !== undefined && !(this.cdr as ViewRef_).destroyed) {
      this.cdr.detectChanges();
    }
  }
}
