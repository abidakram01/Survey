import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendComponent } from './attend/attend.component';
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: AttendComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule]
})
export class AttendRoutingModule { }
