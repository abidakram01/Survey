import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChooseLanguageComponent } from './choose-language.component';

const routes: Routes = [
  {
    path: '',
    component: ChooseLanguageComponent
  },
  {
    path: 'chooselanguage/:id',
    component: ChooseLanguageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChooseLanguageRoutingModule { }
