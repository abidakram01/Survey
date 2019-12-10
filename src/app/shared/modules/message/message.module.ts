import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AlertComponent, ConfirmComponent],
  imports: [
    CommonModule,
    TranslateModule
  ]
})
export class MessageModule { }
