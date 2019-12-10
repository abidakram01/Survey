import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareSurveyComponent, DeleteSurveyComponent, DisableSurveyComponent, SurveyReportsComponent } from './components';
import { ChipsComponent } from './components/chips/chips.component';
import { FileUploadModule } from 'ng2-file-upload';



@NgModule({
  declarations: [
    ShareSurveyComponent,
    DeleteSurveyComponent,
    DisableSurveyComponent,
    SurveyReportsComponent,
    ChipsComponent,
    
    
  ],
  imports: [
    CommonModule,
    FileUploadModule,
  ],
  exports: [
    ShareSurveyComponent,
    DeleteSurveyComponent,
    DisableSurveyComponent,
    SurveyReportsComponent,
    ChipsComponent,
    FileUploadModule,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule { }
