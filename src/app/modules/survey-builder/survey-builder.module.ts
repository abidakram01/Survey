import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbRatingModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { SingleInputComponent } from './single-input/single-input.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { MultipleChoiceComponent } from './multiple-choice/multiple-choice.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { CommentComponent } from './comment/comment.component';
import { RatingComponent } from './rating/rating.component';
import { BuilderComponent } from './builder/builder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MessageModule } from 'src/app/shared/modules/message/message.module';

@NgModule({
  declarations: [
    SingleInputComponent,
    CheckboxComponent,
    MultipleChoiceComponent,
    DropdownComponent,
    CommentComponent,
    RatingComponent,
    BuilderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbRatingModule,
    NgbModalModule,
    MessageModule,
    TranslateModule
  ],
  exports: [
    SingleInputComponent,
    CheckboxComponent,
    MultipleChoiceComponent,
    DropdownComponent,
    CommentComponent,
    RatingComponent,
    BuilderComponent
  ],
})
export class SurveyBuilderModule { }
