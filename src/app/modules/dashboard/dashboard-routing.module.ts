import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardBaseComponent } from './dashboard-base/dashboard-base.component';
import { SurveyReportComponent } from './survey-report/survey-report.component';
import { SurveysComponent } from './surveys';
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'dashboard',
    children: [
    {
      path: '',
      canActivate: [AuthGuardService],
      component: DashboardBaseComponent,
    },
    {
      path: 'surveys/:id',
      component: SurveysComponent
    },
    {
      path: 'report',
      component: SurveyReportComponent
    },
    
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
