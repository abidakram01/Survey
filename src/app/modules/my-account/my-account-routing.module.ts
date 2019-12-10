import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'account-summary',
    component: AccountSummaryComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile-edit',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule {
  accountType = 1;
}
