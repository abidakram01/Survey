import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import '@ckeditor/ckeditor5-build-classic/build/translations/ar';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from '@angular/router';

import { CmsService } from "../services";
import { environment as env } from '../../../../environments/environment';
import { LanguageTranslationService } from '../../../shared/services/language-translation.service';


@Component({
  selector: 'app-edit-static-page',
  templateUrl: './edit-static-page.component.html',
  styleUrls: ['./edit-static-page.component.css']
})
export class EditStaticPageComponent implements OnInit {
  public enContent = ClassicEditor;
  public arContent = ClassicEditor;
  public enContentForm = {
    editor: '<p>Start Typing....</p>'
  }
  public arContentForm = {
    editor: '<p>ابدأ الطباعة....</p>'
  }
  title_en: string;
  title_ar: string;
  slug: string;
  html: string = "{{content}}";
  status: boolean = false;
  error: boolean = false;
  submitted: boolean = false;
  done: boolean = false;
  public enConfig = {
    language: 'en',
    toolbar: [
      'undo', 'redo',
      '|',
      'bold', 'italic', 'blockquote', 'heading', 'numberedlist', 'bulletedlist',
      '|',
      'inserttable', 'tablecolumn', 'tablerow', 'mergetablecells',
      '|',
      'link', 'mediaembed', 'ckfinder', 'imagetextalternative', 'imageupload', 'imagestyle:full', 'imagestyle:side',
      '|',
    ]
  };
  public arConfig = {
    language: 'ar',
    toolbar: [
      'undo', 'redo',
      '|',
      'bold', 'italic', 'blockquote', 'heading', 'numberedlist', 'bulletedlist',
      '|',
      'inserttable', 'tablecolumn', 'tablerow', 'mergetablecells',
      '|',
      'link', 'mediaembed', 'ckfinder', 'imagetextalternative', 'imageupload', 'imagestyle:full', 'imagestyle:side',
      '|',
    ]
  };

  public language: string;
  private languageTranslationUnsubscribe: Subject<void> = new Subject();
  public pageData: any;

  constructor(
    private route: ActivatedRoute,
    private languageTranslationService: LanguageTranslationService,
    private localStorage: LocalStorage,
    private cmsService: CmsService,
    private router: Router,
    ) {
    const slug = this.route.snapshot.params['slug'];
    this.cmsService.getStaticPage(slug).subscribe(
      pageData => {
        this.pageData = pageData;
        this.title_en = this.pageData.title_en;
        this.title_ar = this.pageData.title_ar;
        this.slug = this.pageData.slug;
        this.enContentForm.editor = this.pageData.content_en;
        this.arContentForm.editor = this.pageData.content_ar;
        this.status = this.pageData.status;
      }
    );
    

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
  }

  onFormSubmit(){
    this.submitted = true;
    const data = {
      title_en: this.title_en,
      title_ar: this.title_ar,
      slug: this.slug,
      html: this.html,
      content_ar: this.arContentForm.editor,
      content_en: this.enContentForm.editor,
      status: this.status
    }
    this.cmsService.updateStaticPage(this.slug, data)
    .subscribe(
      response => {
        this.done = true; 
        alert("Page updated succesfully");
        this.router.navigate(['/cms/list-static-pages/']);
      },
      error => console.log(error)
    );
  }

}
