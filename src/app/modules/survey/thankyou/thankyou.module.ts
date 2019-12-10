import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ThankyouRoutingModule } from './thankyou-routing.module';
import { ThankyouComponent } from './thankyou/thankyou.component';

@NgModule({
  declarations: [ThankyouComponent],
  imports: [
    CommonModule,
    ThankyouRoutingModule,
    TranslateModule
  ]
})
export class ThankyouModule { }
