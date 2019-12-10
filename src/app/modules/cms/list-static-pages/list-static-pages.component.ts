import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

import { CmsService } from '../services';
import { environment as env } from '../../../../environments/environment';
import { LanguageTranslationService } from '../../../shared/services/language-translation.service';

@Component({
  selector: 'app-list-static-pages',
  templateUrl: './list-static-pages.component.html',
  styleUrls: ['./list-static-pages.component.css']
})
export class ListStaticPagesComponent implements OnInit {
  public pagesData: any;
  public language: string;
  private languageTranslationUnsubscribe: Subject<void> = new Subject();

  // constructor(private cmsService: CmsService) { }
  constructor(
    private languageTranslationService: LanguageTranslationService,
    private localStorage: LocalStorage,
    private cmsService: CmsService,
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
    this.listStaticPages();
  }

  listStaticPages() {
    this.cmsService.listStaticPages().subscribe(
      pagesData => {
         this.pagesData = pagesData;
      }
    );
  }

  deleteStaticPage(slug) {
    if (confirm('Are you sure to delete?')) {
      this.cmsService.deleteStaticPage(slug)
      .subscribe(
        response => {
          alert('Page deleted succesfully');
          this.listStaticPages();
        },
        error => console.log(error)
      );
    }
  }

}
