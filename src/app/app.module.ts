import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
// Local Storage prefix functionality
// https://github.com/cyrilletuzi/angular-async-local-storage/blob/HEAD/docs/PREFIX.md
import { localStorageProviders } from '@ngx-pwa/local-storage';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpConfigInterceptor, HTTPStatus } from './shared/helpers/httpconfig.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Site configuration
// https://blog.angularindepth.com/becoming-an-angular-environmentalist-45a48f7c20d8
import { environment } from '../environments/environment';

// Application Layout module
import {
  RayeiModule
} from './shared/modules/layouts/rayei/rayei.module';

// Loader/Spinner component
import {
  LoadingSpinnerModule
} from './shared/modules/loading-spinner/loading-spinner.module';

// Language Translation module
import {
  LanguageTranslationModule
} from './shared/modules/language-translation/language-translation.module';

import {
  QuestionsModule
} from './modules/questions/questions.module';

// Language Translation service
import {
  LanguageTranslationService
} from './shared/services/language-translation.service';
// 404 Error component
import {
  NotFoundComponent
} from './shared/components/not-found/not-found.component';
// 500 Error component
import {
  ServerErrorComponent
} from './shared/components/server-error/server-error.component';
// Error Handler
import { ErrorsHandler } from './shared/helpers/errors-handler';
import { SurveyDataService } from './shared/services/survey-data.service';
import { DashboardService } from './shared/services/dashboard.service';
import { SurveyViewerModule } from 'src/app/shared/modules/survey-viewer/survey-viewer.module';
import { AuthenticationService } from './shared/services/authentication.service';

// Material UI
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AuthGuardService } from './shared/services/auth-guard.service';
import {
  UserDetailsModule
} from './shared/modules/user-details/user-details.module';

import { MaterialModule } from './material/material.module';
// import * as $ from 'jquery';

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
/** config angular i18n **/
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { SurveyReviewComponent } from './modules/survey-review/survey-review.component';
import { HeaderSurveyComponent } from './header-survey/header-survey.component';
import { FooterSurveyComponent } from './footer-survey/footer-survey.component';
import { QuestionsComponent } from './modules/questions/questions.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DashboardHeaderComponent } from './modules/dashboard-header/dashboard-header.component';
import { SurveyResultComponent } from './modules/survey-result/survey-result.component'
registerLocaleData(en);
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ServerErrorComponent,
    SurveyReviewComponent,
    HeaderSurveyComponent,
    FooterSurveyComponent,
    QuestionsComponent,
    DashboardHeaderComponent,
    SurveyResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LanguageTranslationModule,
    RayeiModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SurveyViewerModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    LoadingSpinnerModule,
    UserDetailsModule,
    NgZorroAntdModule,
    DragDropModule,
    MaterialModule,
    NgxQRCodeModule,
    MatTabsModule
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    },
    HTTPStatus,
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler
    },
    { provide: NZ_I18N, useValue: en_US },
    SurveyDataService,
    LanguageTranslationService,
    DashboardService,
    AuthenticationService,
    AuthGuardService,
    localStorageProviders({
      prefix: environment.local_storage_prefix
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
