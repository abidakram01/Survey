import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Local Storage package
// https://www.npmjs.com/package/@ngx-pwa/local-storage
import { LocalStorage } from '@ngx-pwa/local-storage';

import { LanguageTranslationService } from '../../../shared/services/language-translation.service';
import { StaticPageService } from '../../../shared/services/static-page.service';
import { IStatePageResponse } from '../../../shared/interfaces/IStatePageResponse';
import { environment as env } from '../../../../environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { error } from 'util';

@Component({
  selector: 'app-static-page',
  templateUrl: './static-page.component.html',
  styleUrls: ['./static-page.component.css']
})
export class StaticPageComponent implements OnInit, OnDestroy {
  public currentRouteUrl: string;
  public pageContent: IStatePageResponse;
  public language: string;
  private languageTranslationUnsubscribe: Subject<void> = new Subject();

  constructor(
    private languageTranslationService: LanguageTranslationService,
    private staticPageService: StaticPageService,
    private localStorage: LocalStorage,
    private route: ActivatedRoute,
    private router: Router
    ) {

      // Setting language setting from local storage
      this.localStorage.getItem<string>('language').subscribe(
        (language: string) => {
          if (language) {
            this.language = language;
          } else {
            // If failed to find the selected language from local storage,
            // then set the default language from app config
            this.language = env.defaultLanguage;
          }
        },
        (error) => console.warn(error)
      );

      // Language change event handling
      this.languageTranslationService.languageTranslation$
      .pipe(takeUntil(this.languageTranslationUnsubscribe))
      .subscribe(
        (language: string) => this.language = language
      );
    }

  ngOnInit() {
    this.route.params.subscribe(
      (params: any) => {
        this.currentRouteUrl = params['slug'];
        console.log(this.currentRouteUrl);
        this.staticPageService.getPageContent(this.currentRouteUrl)
        .subscribe(
          (response: IStatePageResponse) => {
            this.pageContent = response;
          },
          error => this.router.navigateByUrl('/not-found')
        );
      }
    );
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.languageTranslationUnsubscribe.next();
    this.languageTranslationUnsubscribe.complete();
  }

}
