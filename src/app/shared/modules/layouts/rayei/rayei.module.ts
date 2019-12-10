import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RayeiComponent } from './rayei.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../../message/alert/alert.component';
import { MessageModule } from '../../message/message.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TranslateModule } from '@ngx-translate/core';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { NzDrawerModule } from 'ng-zorro-antd';



// Loader/Spinner component
import {
  LoadingSpinnerModule
} from '../../loading-spinner/loading-spinner.module';
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("440102712463")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("2356635574431430")
  }
]);

export function provideConfig() {
  return config;
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbModalModule,
    NgbAlertModule,
    MessageModule,
    RecaptchaModule.forRoot(),
    LoadingSpinnerModule,
    SocialLoginModule,
    NzDrawerModule

  ],
  exports: [RayeiComponent],
  declarations: [RayeiComponent, LoginComponent, SignupComponent, ForgotPasswordComponent],
  providers: [{
   provide: AuthServiceConfig,
   useFactory: provideConfig
   }
  ],
  entryComponents: [AlertComponent],
})
export class RayeiModule {}
