import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbTabsetModule, NgbModalModule, NgbTooltipModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { DashboardBaseComponent } from './dashboard-base/dashboard-base.component';
import { CompanySurveysComponent } from './company-surveys/company-surveys.component';
import { PlanNPricingComponent } from './plan-n-pricing/plan-n-pricing.component';
import { UserAvailableSurveysComponent } from './user-available-surveys/user-available-surveys.component';
import { UserAttendedSurveysComponent } from './user-attended-surveys/user-attended-surveys.component';
import { UserReportsComponent } from './user-reports/user-reports.component';
import { IndividualPlansComponent } from './individual-plans/individual-plans.component';
import { TeamPlansComponent } from './team-plans/team-plans.component';
import { DashboardService } from 'src/app/shared/services/dashboard.service';

import { ChartsModule } from 'ng2-charts';
import { SurveyReportComponent } from './survey-report/survey-report.component';
import { SurveysComponent } from './surveys';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageModule } from 'src/app/shared/modules/message/message.module';
import { AlertComponent } from 'src/app/shared/modules/message/alert/alert.component';
import { ConfirmComponent } from 'src/app/shared/modules/message/confirm/confirm.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [UserDashboardComponent,
    CompanyDashboardComponent,
    DashboardBaseComponent,
    CompanySurveysComponent,
    PlanNPricingComponent,
    UserAvailableSurveysComponent,
    UserAttendedSurveysComponent,
    UserReportsComponent,
    IndividualPlansComponent,
    TeamPlansComponent,
    SurveyReportComponent,
    SurveysComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbTabsetModule,
    NgbModalModule,
    ChartsModule,
    NgbTooltipModule,
    SharedModule,
    MessageModule,
    TranslateModule,
    NgbDropdownModule
  ],
  providers: [DashboardService, DatePipe],
  entryComponents: [AlertComponent, ConfirmComponent]
})
export class DashboardModule { }
