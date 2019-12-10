import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendRoutingModule } from './attend-routing.module';
import { AttendComponent } from './attend/attend.component';
import { SurveyViewerModule } from 'src/app/shared/modules/survey-viewer/survey-viewer.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'src/app/shared/modules/message/message.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AttendComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AttendRoutingModule,
    SurveyViewerModule,
    NgbModalModule,
    MessageModule
  ]
})
export class AttendModule { }
