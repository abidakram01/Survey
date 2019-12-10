import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SurveyListComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    TranslateModule
  ]
})
export class CompanyModule { }
