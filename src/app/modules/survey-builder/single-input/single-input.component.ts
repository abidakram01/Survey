import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';
import { SurveyDataService } from 'src/app/shared/services/survey-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { ViewRef_ } from '@angular/core/src/view';
import { ISurvey } from 'src/app/shared/interfaces/ISurvey';

@Component({
  selector: 'app-single-input',
  templateUrl: './single-input.component.html',
  styleUrls: ['./single-input.component.css'],
})
export class SingleInputComponent implements OnInit {
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

  public singleInputForm: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private surveyDataService: SurveyDataService,
    private modalService: NgbModal
  ) {
    this.singleInputForm = new FormGroup({
      singleInput: new FormControl('')
    });
  }


  ngOnInit() {
  }

  /**
   * Method to open question edit modal
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
   * Method to handle edit question button click event
   */
  onQuestionEditBtnClick() {
    this.modalService.open(this.editQuestionModal, { centered: true });
  }

  /**
   * Method to handle edit question form submit event
   */
  onFormSubmit() {
    // Gets the from value
    this.question.question = this.singleInputForm.get('singleInput').value;
    // Save changes to the local storage
    this.surveyDataService.onSurveyBuilderChanges();
    // Closes the modal
    this.modalService.dismissAll();
    // Trigger Change detection
    this.detectChanges();
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

}
