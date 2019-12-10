import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment as env } from '../../../../environments/environment';

@Component({
  selector: 'app-share-survey',
  templateUrl: './share-survey.component.html',
  styleUrls: ['./share-survey.component.css']
})
export class ShareSurveyComponent implements OnInit {
  @Input() survey: any;
  @Input() displayAs = 'icon';

  baseUrl: string = env.siteDomain;

  @ViewChild('weblinkPopup')
  weblinkPopup: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    console.log(this.displayAs, ' displayAs');
  }

  shareSurvey() {
    // show pop up
  }

  openPopup() {
    this.modalService.open(this.weblinkPopup);
  }

}
