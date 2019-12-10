/**
 * This is the module used to define all the routing paths to the app
 * Docs: https://angular.io/guide/router
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  NotFoundComponent
} from './shared/components/not-found/not-found.component';
import {
 RayeiComponent
} from './shared/modules/layouts/rayei/rayei.component';
import {
  ServerErrorComponent
} from './shared/components/server-error/server-error.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { AttendModule } from './modules/survey/attend/attend.module';
import { LoginComponent } from './shared/modules/layouts/rayei/login/login.component';
import { SignupComponent } from './shared/modules/layouts/rayei/signup/signup.component';
import { ForgotPasswordComponent } from './shared/modules/layouts/rayei/forgot-password/forgot-password.component';
import { UserDetailsComponent } from './shared/modules/user-details/user-details/user-details.component';
import { ChooseLanguageComponent } from './modules/choose-language/choose-language.component';
import { SurveyReviewComponent } from './modules/survey-review/survey-review.component';
import { QuestionsComponent } from './modules/questions/questions.component';
import { SurveyResultComponent} from './modules/survey-result/survey-result.component'
/**
 * Lazy loading the modules for performance
 * Ref: https://angular.io/guide/lazy-loading-ngmodules
 */
const routes: Routes = [
  { path: 'signout', canActivate: [AuthGuardService], component: NotFoundComponent, redirectTo: '', pathMatch: 'full'},
  {
    path: '',
    component: RayeiComponent,
    children: [
      {
        path: '',
        loadChildren: './modules/home/home.module#HomeModule'
      },
      {
        path: 'page',
        loadChildren: './modules/static-pages/static-pages.module#StaticPagesModule'
      },
      {
        path: '',
        loadChildren: './modules/my-account/my-account.module#MyAccountModule'
      },
      {
        path: '',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: '',
        loadChildren: './modules/contact/contact.module#ContactModule'
      },
      {
        path: '',
        loadChildren: './modules/win/win.module#WinModule'
      },
      {
        path: '',
        loadChildren: './modules/choose-language/choose-language.module#ChooseLanguageModule'
      },
      {
        path: '',
        loadChildren: './modules/company/company.module#CompanyModule'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'forget',
        component: ForgotPasswordComponent
      },
      
      {
        path: 'questions',
        component: QuestionsComponent
      },

      
    ]
  },
  {
    path: 'cms',
    component: RayeiComponent,
    children: [
      {
        path: '',
        loadChildren: './modules/cms/cms.module#CmsModule'
      },
    ]
  },
  {
    path: 'survey',
    component: RayeiComponent,
    children: [
      {
        path: 'start-survey',
        loadChildren: './modules/survey/start-survey/start-survey.module#StartSurveyModule'
      },
      
      {
        path: 'manage',
        loadChildren: './modules/survey/manage/manage.module#ManageModule'
      },
      {
        path: 'share',
        loadChildren: './shared/modules/survey-share/survey-share.module#SurveyShareModule'
      },
      {
        path: 'thankyou',
        loadChildren: './modules/survey/thankyou/thankyou.module#ThankyouModule'
      }
    ]
  },
  {
    path: 'survey',
    children: [
      {
        path: 'attend/:id',
        loadChildren: './modules/survey/attend/attend.module#AttendModule'
      },

    ]
  },


  {
    path: 'survey-feedback',
    component: SurveyReviewComponent
  },
  {
    path :'survey-result',
    component : SurveyResultComponent
  },
  {
    path: 'thankyou/:id',
    component: UserDetailsComponent
  },
  // {
  // path: 'chooselanguage/:id',
  // component: './modules/choose-language/choose-language.module#ChooseLanguageModule'
  // },
  {
    path: 'server-error',
    component: ServerErrorComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
