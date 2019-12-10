import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseLanguageComponent } from './choose-language.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ChooseLanguageRoutingModule } from './choose-language-routing.module';

@NgModule({
  declarations: [ChooseLanguageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChooseLanguageRoutingModule,
    NgbDatepickerModule,
    TranslateModule,
  ]
})
export class ChooseLanguageModule { }
