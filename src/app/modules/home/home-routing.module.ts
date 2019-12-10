import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResetPasswordComponent } from '../home/reset-password/reset-password.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reset-password/:token' , component: ResetPasswordComponent },
  {
    path: 'activate/:token',
    component: ActivateAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
