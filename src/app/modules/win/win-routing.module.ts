import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WinHomeComponent } from './win-home';
import { SurveysComponent } from "./surveys";
import { CompanyComponent } from "./company";
import { TypeComponent } from './type/type.component';

const routes: Routes = [{
  path: 'win',
  component: WinHomeComponent
},{
  path: 'win/:id/surveys',
  component: SurveysComponent,
  pathMatch: 'full'
},
{
  path: 'win/list-survey/:id',
  component: TypeComponent
},
{
  path: 'win/list-survey',
  component: CompanyComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WinRoutingModule { }
