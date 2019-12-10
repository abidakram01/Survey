import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-disable-survey',
  templateUrl: './disable-survey.component.html',
  styleUrls: ['./disable-survey.component.css']
})
export class DisableSurveyComponent implements OnInit {
  @Input() survey: number;
  @Input() currentStatus: boolean;
  @Output() disabledSurvey = new EventEmitter();
  // public labelText: string = this.currentStatus === true ? 'Disable' : 'Enable';

  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
    // this.labelText = 
    console.log(`${this.currentStatus} currentStatus`)

  }

  disableSruvey() {
    this.surveyService.disableSurvey(this.survey)
        .subscribe(
          data => this.disabledSurvey.emit(this.survey),
          err => console.log(err)
        )
  }

}
