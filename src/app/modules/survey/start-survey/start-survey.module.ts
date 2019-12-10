import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartSurveyRoutingModule } from './start-survey-routing.module';
import { StartSurveyComponent } from './start-survey.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { MaterialModule } from '../../../material/material.module';

@NgModule({
  declarations: [StartSurveyComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StartSurveyRoutingModule,
    NgbDatepickerModule,
    TranslateModule,
    NzDatePickerModule
  ]
})
export class StartSurveyModule { }
