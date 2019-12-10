/**
 * This module is used to language translations.
 * The translations are saved in a json file in /src/app/assets/i18n directory
 * Docs: https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular7-app-with-ngx-translate
 */
import { NgModule } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

// import ngx-translate and the http loader
import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {
  LanguageTranslationService
} from '../../services/language-translation.service';

// ngx-translate - required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [],
  imports: [
    // HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ],
  exports: [
    TranslateModule
  ],
})
export class LanguageTranslationModule {
  constructor(
    private translate: TranslateService,
    private languageTranslationService: LanguageTranslationService,
  ) {
    this.translate.addLangs(['en', 'ar']);
    // Setting Default language as Arabic
    this.translate.setDefaultLang('en');

    // Language change event handling
    this.languageTranslationService.languageTranslation$.subscribe(
      (language: string) => {
        this.translate.use(language);
      }
    );
  }
}
