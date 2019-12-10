import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  isOpen: number;
  controls: any;
  selectedChoice: any = { value: "Select" }
  elementList: any[] = [
    {'id': 1, 'type': 'checkbox', 'value': 'Checkbox', icon: 'fa-check-square'},
    {'id': 2, 'type': 'rating', 'value': 'Rating', icon: 'fa-star'},
    {'id': 3, 'type': 'textarea', 'value': 'comment', icon: 'fa-comment-o'},
    {'id': 4, 'type': 'select', 'value': 'dropdown', icon: 'fa-caret-down'},
    {'id': 5, 'type': 'checkbox', 'value': 'Miscellaneous', icon: 'fa-list'},
    {'id': 6, 'type': 'checkbox', 'value': 'Staple Scale', icon: 'fa-check-square'},
    {'id': 7, 'type': 'checkbox', 'value': 'Matrix Table', icon: 'fa-table'},
    {'id': 8, 'type': 'checkbox', 'value': 'Open Minded', icon: 'fa-envelope-open-o'},
    {'id': 9, 'type': 'text', 'value': 'Single Input', icon: 'fa-minus'},
    {'id': 10, 'type': 'checkbox', 'value': 'Number Rating', icon: 'fa-star'},
    {'id': 11, 'type': 'radio', 'value': 'Multiple Choice', icon: 'fa-list'},
    {'id': 12, 'type': 'number', 'value': 'Phone Number', icon: 'fa-phone'}
  ];
  public questionForm: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.questionForm = this._fb.group({
      itemRows: this._fb.array([])
    })
  }
  ngOnInit() {  this.addNewRow() }
  
  addNewRow() {
    this.controls = <FormArray>this.questionForm.controls.itemRows;
    this.controls.push(
      this._fb.group({
        questName: '',
        elementList: this._fb.array(this.elementList),
        selectedElement: {'type': 'select', 'value': 'select'},
        options: this._fb.array([]),
        isOpen: false,
        isActive: false
      })
    )
    console.log('get form arr :', this.questionForm.get('itemRows').value)
  }
  addNewOption(itemrow) {
    itemrow.options.push({
        optionName: '',
        type: itemrow.selectedElement.type
      })
      console.log('this array :', itemrow)
  }
  deleteRow(index: number) {
    this.controls.removeAt(index);
  }
  deleteOption(control, j){
    control.splice(j, 1);
  }
  getSelect(element: any, itemrow){    
    itemrow.options = [];
    itemrow.selectedElement.value = element.value;
    itemrow.selectedElement.type = element.type;
    let control: any = <FormArray>this.questionForm.controls.itemRows;
    this.addNewOption(itemrow)
    console.log('get itemsrow :', itemrow.value , 'and element :', element)
  }
  saveQuestion(itemrow: any){
    itemrow.isActive = true;
    console.log('get all data :',this.questionForm.get('itemRows').value, 'and string: ', JSON.stringify(this.questionForm.get('itemRows').value))
  }
  editQuestion(itemrow: any){
    itemrow.isActive = false;
    console.log('get check IsActive :', itemrow.value)
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questionForm.get('itemRows').value, event.previousIndex, event.currentIndex);
  }
  copy(itemrow: any){
    this.controls.push(
      this._fb.group({
        questName: itemrow.questName,
        elementList: this._fb.array(this.elementList),
        selectedElement: itemrow.selectedElement,
        options: this._fb.array(itemrow.options),
        isOpen: itemrow.isOpen,
        isActive: itemrow.isActive
      })
    )
    console.log('get copy :', this.questionForm.get('itemRows').value, 'and itemrow :', itemrow)
  }
}
