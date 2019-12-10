import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactUsComponent, MapComponent } from './index';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ContactUsComponent, MapComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbAlertModule
  ]
})
export class ContactModule { }
