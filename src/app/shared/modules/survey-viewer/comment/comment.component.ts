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
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
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
export class CommentComponent implements OnInit {
  state = 'hide';

  @Input()
  public question: IQuestion;

  @Input()
  public questionForm: FormGroup[];

  public form: FormGroup;
  public values: FormArray;

  commentId ;


  constructor(public el: ElementRef) { }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop
     console.log(componentPosition);

    const scrollPosition = window.pageYOffset+200
    console.log(scrollPosition);
    if (scrollPosition >= componentPosition) {
      this.state = 'show'
    } else {
      this.state = 'hide'
    }

  }

  ngOnInit() {
    const questionIndex = this.questionForm.findIndex(
      (question) => question.get('component_id').value === this.question.component_id
    );

    this.commentId = questionIndex + 1;
    if (questionIndex >= 0) {
      this.form = this.questionForm[questionIndex];
      this.values = this.form.get('values') as FormArray;
    }
  }
  focus(){
 
    
    this.state = 'show';
       
 if(this.state = 'show'){
     this.el.nativeElement.scrollIntoView({
       behavior: 'smooth',
        block: 'center',
        
       }
       
     )
      }
     }//focus
}
