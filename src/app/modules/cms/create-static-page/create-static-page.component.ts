import { Component, OnInit } from '@angular/core';
import '@ckeditor/ckeditor5-build-classic/build/translations/ar';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from '@angular/router';

import { CmsService } from '../services';

@Component({
  selector: 'app-create-static-page',
  templateUrl: './create-static-page.component.html',
  styleUrls: ['./create-static-page.component.css']
})
export class CreateStaticPageComponent implements OnInit {

  public enContent = ClassicEditor;
  public arContent = ClassicEditor;

  public enContentForm = {
    editor: '<p>Start Typing....</p>'
  };
  public arContentForm = {
    editor: '<p>ابدأ الطباعة....</p>'
  };
  title_en: string;
  title_ar: string;
  slug: string;
  html = '{{content}}';
  status = false;
  error = false;
  submitted = false;
  done = false;

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

  constructor(private cmsService: CmsService, private router: Router, ) { }

  ngOnInit() {
  }

  onFormSubmit() {
    this.submitted = true;
    const data = {
      title_en: this.title_en,
      title_ar: this.title_ar,
      slug: this.slug,
      html: this.html,
      content_ar: this.arContentForm.editor,
      content_en: this.enContentForm.editor,
      status: this.status,
    };
    this.cmsService.createStaticPage(data)
        .subscribe(
          response => {
            this.done = true; alert('Page created succesfully');
            this.router.navigate(['/cms/list-static-pages/']);
          },
          error => console.log(error)
        );
  }

}
