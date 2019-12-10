import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyShareRoutingModule } from './survey-share-routing.module';
import { ShareComponent } from './share/share.component';
import { MessageModule } from '../message/message.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxQRCodeModule } from 'ngx-qrcode2';


@NgModule({
  declarations: [ShareComponent],
  imports: [
    CommonModule,
    SurveyShareRoutingModule,
    MessageModule,
    NgbModalModule,
    FormsModule,
    SharedModule,
    TranslateModule,
    NgxQRCodeModule
  ],
  exports: [
    ShareComponent
  ]
})
export class SurveyShareModule { }
