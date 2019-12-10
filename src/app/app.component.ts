import { Component, ChangeDetectorRef , Renderer2 } from '@angular/core';
// Local Storage package
// https://www.npmjs.com/package/@ngx-pwa/local-storage
import { LocalStorage } from '@ngx-pwa/local-storage';

// Language Translation service
import {
  LanguageTranslationService
} from './shared/services/language-translation.service';
import { HTTPStatus } from './shared/helpers/httpconfig.interceptor';
import { LocalStorageUpdateService } from 'src/app/shared/services/local-storage-update.service';
import { ViewRef_ } from '@angular/core/src/view';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public HTTPActivity: boolean;
 public selectLangFlag = 'en';
  public useLang: { name: string };
  public langEN = { name: 'name_en' };
  public langAR = { name: 'name_ar' };
  public language: string;
  public langDisplayClass = 'hide';
  constructor(
    private localStorage: LocalStorage,
    private languageTranslationService: LanguageTranslationService,
    private httpStatus: HTTPStatus,
    private localStorageUpdate: LocalStorageUpdateService,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2
  ) {

    this.httpStatus.getHttpStatus().subscribe(
      (status: boolean) => {
        this.HTTPActivity = status;
       });
    // Setting language setting from local storage
    this.localStorage.getItem<string>('language').subscribe(
      (language: string) => {
        if (language) {
          this.languageTranslationService.onLanguageChange(language);
        } else {
          this.languageTranslationService.onLanguageChange('en');
        }
      },
      (error) => console.warn(error)
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
      this.language = language;
      if (language === 'en') {
        this.renderer.removeClass(document.body, 'style-arabic');
      } else {
        this.renderer.addClass(document.body, 'style-arabic');
      }
      this.detectChanges();
    });
  }

  detectChanges() {
    if (this.cdr !== null && this.cdr !== undefined && !(this.cdr as ViewRef_).destroyed) {
      this.cdr.detectChanges();
    }
     }
}
