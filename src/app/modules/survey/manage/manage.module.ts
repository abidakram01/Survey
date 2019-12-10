import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTabsetModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ManageRoutingModule } from './manage-routing.module';
import { PreviewComponent } from './preview/preview.component';
import { DesignComponent } from './design/design.component';
import { ManageComponent } from './manage/manage.component';
import { SurveyService } from 'src/app/shared/services/survey.service';
import { SurveyViewerModule } from 'src/app/shared/modules/survey-viewer/survey-viewer.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MessageModule } from 'src/app/shared/modules/message/message.module';
import { SurveyShareModule } from 'src/app/shared/modules/survey-share/survey-share.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { SurveyBuilderModule } from '../../survey-builder/survey-builder.module';

@NgModule({
  declarations: [
    PreviewComponent,
    DesignComponent,
    ManageComponent,
  ],
  imports: [
    CommonModule,
    ManageRoutingModule,
    NgbTabsetModule,
    SurveyBuilderModule,
    NgbModalModule,
    SurveyViewerModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    MessageModule,
    SurveyShareModule,
    SharedModule,
    TranslateModule
  ],
  providers: [
    SurveyService
  ]
})
export class ManageModule { }
