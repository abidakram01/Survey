import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';
import { FormGroup, FormArray } from '@angular/forms';
import {  HostListener, ElementRef } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
       // transform: "translateX(0)"
      })),
      state('hide',   style({
        opacity: 0.5,
       // transform: "translateX(-100%)"
      })),
      transition('show => hide', animate('150ms ease-out')),
      transition('hide => show', animate('150ms ease-in'))
    ])
  ]
})
export class RatingComponent implements OnInit {
  state = 'hide';


  @Input()
  public question: IQuestion;

  @Input()
  public questionForm: FormGroup[];

  @Input()
  public language: any;

  public form: FormGroup;

  public selectedIndex = -1;

  constructor(public el: ElementRef) { }

  @HostListener('window:scroll', ['$event'])
    checkScroll() {
      const componentPosition = this.el.nativeElement.offsetTop;

      const scrollPosition = window.pageYOffset + 220;
      if (scrollPosition >= componentPosition ) {
        this.state = 'show';

      } else {
        this.state = 'hide';
      }




    }

  ngOnInit() {
    const questionIndex = this.questionForm.findIndex(
      (question) => question.get('component_id').value === this.question.component_id
    );

    if (questionIndex >= 0) {
      this.form = this.questionForm[questionIndex];
    }
  }

  focus() {


    const p1 = new Promise( (resolve, reject) => {
      this.state = 'show';

    } );

    p1.then(
      this.el.nativeElement.scrollIntoView({
        behavior: 'smooth',
         block: 'center',

        }

      )
      );



//     this.state = 'show';

//  if(this.state = 'show'){
//      this.el.nativeElement.scrollIntoView({
//        behavior: 'smooth',
//         block: 'center',

//        }

//      )
//       }
     }// focus


  /**
   * On rating click event.
   * Method used to display rating style logic
   * @param selectedIndex current selected rating value index
   */
  onRatingSelection(selectedIndex) {
    this.selectedIndex = selectedIndex;
  }
}
