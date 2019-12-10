import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleChoiceComponent implements OnInit {
  @Input()
  public question: IQuestion;

  @Input()
  public questionForm: FormGroup[];

  public form: FormGroup;

  constructor() { }

  ngOnInit() {
    const questionIndex = this.questionForm.findIndex(
      (question) => question.get('component_id').value === this.question.component_id
    );

    if (questionIndex >= 0) {
      this.form = this.questionForm[questionIndex];
    }
  }

}
