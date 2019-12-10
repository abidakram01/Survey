import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { AttendComponent } from './attend/attend/attend.component';
// import { ManageModule } from './manage/manage.module';
// import { AttendModule } from './attend/attend.module';

@NgModule({
  declarations: [AttendComponent],
  imports: [
    CommonModule,
    TranslateModule
    // SurveyRoutingModule,
    // ManageModule,
    // AttendModule
  ]
})
export class SurveyModule { }
