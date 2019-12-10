import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css']
})
export class ChipsComponent implements OnInit {
  @Input() chip: string;
  @Output() deletedChip = new EventEmitter<string>();
  @Output() editedChip = new EventEmitter<string>();
  active: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  deleteChip(chip: string){
    this.deletedChip.emit(chip);
    this.active = false;
  }

  editChip(chip: string){
    
  }
}
