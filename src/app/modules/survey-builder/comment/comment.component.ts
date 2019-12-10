import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';
import { SurveyDataService } from 'src/app/shared/services/survey-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { ViewRef_ } from '@angular/core/src/view';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input()
  public surveyId: string;

  @Input()
  public pageId: string;

  @Input()
  public question: IQuestion;

  @Input()
  public language: string;

  @ViewChild('editQuestionModal')
  public editQuestionModal: any;

  public inputForm = new FormGroup({
    question: new FormControl()
  });

  constructor(
    private surveyDataService: SurveyDataService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
  }

  /**
   * Method to handle edit question button click event
   */
  onQuestionEditBtnClick() {
    this.modalService.open(this.editQuestionModal, { centered: true });
  }

  /**
   * Method to duplicate question
   */
  onQuestionDuplicate() {
    this.surveyDataService.onSurveyQuestionDuplicate(
      this.surveyId,
      this.pageId,
      this.question.component_id,
      this.question
    );
  }


  /**
   * Method for question deletion
   */
  onQuestionDelete() {
    this.surveyDataService.onSurveyBuilderQuestionDelete(
      this.surveyId,
      this.pageId,
      this.question.component_id
    );
  }

  /**
   * To trigger change detection
   */
  detectChanges() {
    if ( this.cdr !== null &&
      this.cdr !== undefined &&
      ! (this.cdr as ViewRef_).destroyed ) {
      this.cdr.detectChanges();
    }
  }

  // ================================== MODAL METHODS ==========================

  oninputFormSubmit() {
    this.question.question = this.inputForm.get('question').value;
    // Save changes to the local storage
    this.surveyDataService.onSurveyBuilderChanges();
    // Closes the modal
    this.modalService.dismissAll();
    // Trigger Change detection
    this.detectChanges();
  }

}
