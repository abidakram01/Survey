import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';
import { SurveyDataService } from 'src/app/shared/services/survey-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UniqueIdHelper } from 'src/app/shared/helpers/unique-Id-helper';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ViewRef_ } from '@angular/core/src/view';
import { IOption } from 'src/app/shared/interfaces/IOption';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.css'],
})
export class MultipleChoiceComponent implements OnInit {
  @Input()
  public surveyId: string;

  @Input()
  public pageId: string;

  @Input()
  public question: IQuestion;

  @Input()
  public language: any;

  @ViewChild('editQuestionModal')
  public editQuestionModal: any;

  private uniqueIdHelper = new UniqueIdHelper();

  public inputForm = new FormGroup({
    question: new FormControl(),
    options: new FormArray([])
  });

  // Setter returns a empty option form group
  get newOption() {
    return new FormGroup({
      component_id: new FormControl(this.uniqueIdHelper.getUniqueId()),
      name: new FormControl(''),
      order: new FormControl('')
    });
  }

  // Setter Returns options form controls
  get optionForms() {
    return this.inputForm.get('options') as FormArray;
  }

  constructor(
    private surveyDataService: SurveyDataService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.question.options.forEach(options => {
      this.optionForms.controls.push(new FormGroup({
        component_id: new FormControl(options.component_id),
        name: new FormControl(options.name),
        order: new FormControl('')
      }));
    });
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
  /**
   * To remove an option
   * @param index
   */
  onRemoveOption(index) {
    this.optionForms.controls.splice(index, 1);
  }

  onAddOption() {
    this.optionForms.controls.push(this.newOption);
  }

  onRemoveAllOption() {
    this.optionForms.controls = [];
  }

  oninputFormSubmit() {
    this.question.question = this.inputForm.get('question').value;
    const options = [];
    let option: IOption;
    this.optionForms.controls.forEach((optionGroup, index) => {
      option = optionGroup.value;
      option.order = index;
      options.push(optionGroup.value);
    });
    this.question.options = options;
    // Save changes to the local storage
    this.surveyDataService.onSurveyBuilderChanges();
    // Closes the modal
    this.modalService.dismissAll();
    // Trigger Change detection
    this.detectChanges();
  }

  /**
   * Angular For loop track by function
   * @param index
   * @param item
   */
  optionTrackByFn(index, item) {
    return item.get('component_id').value;
  }

}
