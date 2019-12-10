import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// Local Storage package
// https://www.npmjs.com/package/@ngx-pwa/local-storage
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable()
export class LanguageTranslationService {
  private languageTranslationSource = new Subject<string>();
  public languageTranslation$ = this.languageTranslationSource;
  // apiKey = '';
  // url = 'https://translation.googleapis.com/language/translate';
  // result: any;
  // q: any;
  constructor(private localStorage: LocalStorage, private http: HttpClient) {}

  onLanguageChange(language: string) {
    // Saving language selection to the local storage
    this.localStorage.setItemSubscribe('language', language);
    this.languageTranslationSource.next(language);
  }
  // translate() {
  //   let params = new HttpParams();
  //   params = params.append('q', this.q);
  //   params = params.append('target', 'es');
  //   params = params.append('key ', this.apiKey);

  //   this.http.get(this.url, {params: params})
  //     .subscribe(response => this.result = response);
  //  }


}
