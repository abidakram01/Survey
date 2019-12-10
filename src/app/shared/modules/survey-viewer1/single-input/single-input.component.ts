import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-single-input',
  templateUrl: './single-input.component.html',
  styleUrls: ['./single-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleInputComponent implements OnInit {
  @Input()
  public question: IQuestion;

  @Input()
  public questionForm: FormGroup[];

  public form: FormGroup;
  public values: FormArray;

  constructor() { }

  ngOnInit() {
    const questionIndex = this.questionForm.findIndex(
      (question) => question.get('component_id').value === this.question.component_id
    );

    if (questionIndex >= 0) {
      this.form = this.questionForm[questionIndex];
      this.values = this.form.get('values') as FormArray;
    }
  }

}
