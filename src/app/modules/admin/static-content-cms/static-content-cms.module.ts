import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticContentCmsRoutingModule } from './static-content-cms-routing.module';
import { ContentFormComponent } from './content-form/content-form.component';
import { ContentCreateComponent } from './content-create/content-create.component';
import { ContentEditComponent } from './content-edit/content-edit.component';
import { ContentViewComponent } from './content-view/content-view.component';
import { ContentListComponent } from './content-list/content-list.component';

@NgModule({
  declarations: [ContentFormComponent, ContentCreateComponent, ContentEditComponent, ContentViewComponent, ContentListComponent],
  imports: [
    CommonModule,
    StaticContentCmsRoutingModule
  ]
})
export class StaticContentCmsModule { }
