import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticPagesRoutingModule } from './static-pages-routing.module';
import { StaticPageComponent } from './static-page/static-page.component';
import { StaticPageService } from '../../shared/services/static-page.service';
import { RenderHtmlPipe } from '../../shared/pipe/render-html.pipe';

@NgModule({
  declarations: [
    StaticPageComponent,
    RenderHtmlPipe
  ],
  imports: [
    CommonModule,
    StaticPagesRoutingModule
  ],
  providers: [
    StaticPageService,
  ]
})
export class StaticPagesModule { }
