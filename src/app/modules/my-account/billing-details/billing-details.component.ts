import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.css']
})
export class BillingDetailsComponent implements OnInit {
  public expandColumn: any = 'overview';
  constructor() { }

  ngOnInit() {
  }

  expandTab(event){
    if(event.target.id === this.expandColumn){
      this.expandColumn = '';
    }
    else{
      this.expandColumn = event.target.id;
    }
  }

}
