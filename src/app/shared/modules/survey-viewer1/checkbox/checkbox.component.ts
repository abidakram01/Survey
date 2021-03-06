import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';
import { IOption } from 'src/app/shared/interfaces/IOption';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements OnInit {
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

  /**
   * Function called in ngFor to track items in the survey array
   * https://angular.io/api/core/TrackByFunction
   * @param index Current loop index
   * @param option Current option data
   */
  optionTrackByFn(index: number, option: IOption) {
    return option.order;
  }

}
