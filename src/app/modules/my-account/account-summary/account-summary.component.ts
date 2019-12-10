import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ProfileUpdateService } from 'src/app/shared/services/profile-update.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { LocalStorageUpdateService } from 'src/app/shared/services/local-storage-update.service';
import { ViewRef_ } from '@angular/core/src/view';
import { LanguageTranslationService } from 'src/app/shared/services/language-translation.service';
import { environment as env } from '../../../../environments/environment';

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.css']
})
export class AccountSummaryComponent implements OnInit {
  public accountType = 2;
  public userID;
  public profileData;
  public language: any;
   public useLang: { name: string };
  public langEN = { name: 'name_en' };
  public langAR = { name: 'name_ar' };

  public profileDetails;
  public activeTab: any = 'overview';
  constructor(
    private updateService: ProfileUpdateService,
    private localStorage: LocalStorage,
    private localStorageUpdate: LocalStorageUpdateService,
    private languageTranslationService: LanguageTranslationService,
    private cdr: ChangeDetectorRef,
  ) {
    this.localStorage.getItem<string>('userData').subscribe(
      (data: any) => {
        this.userID = data.user_id;
        this.updateService.getProfileData(this.userID).subscribe(
          profileData => {
            this.profileData = profileData;
            this.profileDetails = {
              name: this.profileData.forename + ' ' + this.profileData.surname,
              email: this.profileData.personal_email,
              mobile: this.profileData.mobile,
              id: this.profileData.id
            };
          }
        );
        });

        this.localStorageUpdate.localStorage$.subscribe(data => {
          this.localStorage.getItem<string>('userData').subscribe(
            (data: any) => {
              this.userID = data.user_id;
              this.updateService.getProfileData(this.userID).subscribe(
                profileData => {
                   this.profileData = profileData;
                  this.profileDetails = {
                    name: this.profileData.forename + '  ' + this.profileData.surname,
                    email: this.profileData.personal_email,
                    mobile: this.profileData.mobile,
                    id: this.profileData.id
                  };
                }
              );
              });
        });
   }

  ngOnInit() {
        // Gets the chosen language
    this.localStorage.getItem<string>('language').subscribe(
      (language: string) => {
        if (language) {
          this.language = language;
        } else {
          this.language = env.defaultLanguage;
        }
        this.useLang = language === 'en' ? this.langEN : this.langAR;
      },
      err => this.language = env.defaultLanguage
    );

    // Subscribing to the language changes
    this.languageTranslationService.languageTranslation$
    .subscribe(
      (language) => {
        this.language = language;
        this.useLang = language === 'en' ? this.langEN : this.langAR;
        this.detectChanges();
      }
    );
  }

  changeActiveTab(event) {
    this.activeTab = event.target.id;
  }

  editProfile(id) {
    this.activeTab = id;
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
