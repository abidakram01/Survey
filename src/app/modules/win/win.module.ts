import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { WinRoutingModule } from './win-routing.module';
import { WinHomeComponent, CompanyComponent, SurveysComponent, WinService } from './index';
import { TypeComponent } from './type/type.component';
import { TranslateModule } from '@ngx-translate/core';
import { MessageModule } from '../../shared/modules/message/message.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [WinHomeComponent, CompanyComponent, SurveysComponent, TypeComponent],
  imports: [
    CommonModule,
    WinRoutingModule,
    NgbModalModule,
    MessageModule,
    SharedModule,
    TranslateModule
  ],
  schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
  providers: [WinService]
})
export class WinModule { }
