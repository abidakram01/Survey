import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    QuestionsComponent,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ]
})
export class QuestionsModule { }
