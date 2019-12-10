import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentCreateComponent } from './content-create/content-create.component';
import { ContentEditComponent } from './content-edit/content-edit.component';
import { ContentViewComponent } from './content-view/content-view.component';
import { ContentListComponent } from './content-list/content-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: ContentCreateComponent
  },
  {
    path: 'edit',
    component: ContentEditComponent
  },
  {
    path: 'view',
    component: ContentViewComponent
  },
  {
    path: 'list',
    component: ContentListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticContentCmsRoutingModule { }
