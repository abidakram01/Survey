import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { CmsRoutingModule } from './cms-routing.module';
import { CreateStaticPageComponent, CmsService } from './index';
import { ListStaticPagesComponent } from './list-static-pages/list-static-pages.component';
import { EditStaticPageComponent } from 'src/app/modules/cms/edit-static-page/edit-static-page.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CreateStaticPageComponent, ListStaticPagesComponent, EditStaticPageComponent],
  imports: [
    CommonModule,
    CKEditorModule,
    CmsRoutingModule,
    FormsModule,
    TranslateModule
  ],
  providers: [CmsService]
})
export class CmsModule { }
