import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { MessageModule } from 'src/app/shared/modules/message/message.module';
import { AlertComponent } from 'src/app/shared/modules/message/alert/alert.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { TranslateModule } from '@ngx-translate/core';
// import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

@NgModule({
  declarations: [HomeComponent,
    ResetPasswordComponent,
    ActivateAccountComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModalModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MessageModule,
    RecaptchaModule.forRoot()
  ],
  entryComponents: [AlertComponent],
})
export class HomeModule { }
