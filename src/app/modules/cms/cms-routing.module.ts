import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateStaticPageComponent } from './create-static-page';
import { ListStaticPagesComponent } from './list-static-pages/list-static-pages.component';
import { EditStaticPageComponent } from 'src/app/modules/cms/edit-static-page/edit-static-page.component';
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service';

const routes: Routes = [{
    path: 'create-static-page',
    component: CreateStaticPageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'list-static-pages',
    component: ListStaticPagesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'edit-static-page/:slug',
    component: EditStaticPageComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
