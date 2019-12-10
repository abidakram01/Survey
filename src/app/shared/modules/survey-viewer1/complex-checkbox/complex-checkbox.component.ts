import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';

@Component({
  selector: 'app-complex-checkbox',
  templateUrl: './complex-checkbox.component.html',
  styleUrls: ['./complex-checkbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComplexCheckboxComponent implements OnInit {
  @Input()
  public question: IQuestion;

  constructor() { }

  ngOnInit() {
  }

}
