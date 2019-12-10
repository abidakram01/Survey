import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyViewContainerComponent } from './survey-view-container/survey-view-container.component';
import { SingleInputComponent } from './single-input/single-input.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { MultipleChoiceComponent } from './multiple-choice/multiple-choice.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { CommentComponent } from './comment/comment.component';
import { RatingComponent } from './rating/rating.component';
import { SurveyService } from '../../services/survey.service';
import { RouterModule } from '@angular/router';
import { ComplexCheckboxComponent } from './complex-checkbox/complex-checkbox.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SurveyViewContainerComponent,
    SingleInputComponent,
    CheckboxComponent,
    MultipleChoiceComponent,
    DropdownComponent,
    CommentComponent,
    RatingComponent,
    ComplexCheckboxComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  providers: [SurveyService],
  exports: [SurveyViewContainerComponent]
})
export class SurveyViewerModule {}
