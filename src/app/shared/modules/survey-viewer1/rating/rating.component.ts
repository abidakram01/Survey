import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent implements OnInit {
  @Input()
  public question: IQuestion;

  @Input()
  public questionForm: FormGroup[];

  @Input()
  public language: string;

  public form: FormGroup;

  public selectedIndex = -1;

  constructor() { }

  ngOnInit() {
    const questionIndex = this.questionForm.findIndex(
      (question) => question.get('component_id').value === this.question.component_id
    );

    if (questionIndex >= 0) {
      this.form = this.questionForm[questionIndex];
    }
  }

  /**
   * On rating click event.
   * Method used to display rating style logic
   * @param selectedIndex current selected rating value index
   */
  onRatingSelection(selectedIndex) {
    this.selectedIndex = selectedIndex;
  }
}
