import { Component, OnInit,ChangeDetectorRef ,Renderer2} from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';

import { LanguageTranslationService } from '../../../shared/services/language-translation.service';
import { LocalStorageUpdateService } from 'src/app/shared/services/local-storage-update.service';
import { NavBarService } from '../../../shared/services/nav-bar.service';
import { ViewRef_ } from '@angular/core/src/view';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public langModalStatus = false;
  public selectLangFlag = 'en';
  public useLang: { name: string };
  public langEN = { name: 'name_en' };
  public langAR = { name: 'name_ar' };
  public language: string;
  public langDisplayClass = 'hide';

  constructor(   private languageTranslationService: LanguageTranslationService,
    private localStorage: LocalStorage,
    private navBarService: NavBarService,
    private localStorageUpdate: LocalStorageUpdateService,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2
) {
       this.localStorage.getItem<string>('language').subscribe(
      (language: string) => {
        this.selectLangFlag = language;
        this.language = language;
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
      this.language = language;
      if (language === 'en') {
        this.renderer.removeClass(document.body, 'style-arabic');
      } else {
        this.renderer.addClass(document.body, 'style-arabic');
      }
      this.detectChanges();
    });
     }

  ngOnInit() {
  }

  detectChanges() {
    if (this.cdr !== null && this.cdr !== undefined && !(this.cdr as ViewRef_).destroyed) {
      this.cdr.detectChanges();
    }
  }
}
