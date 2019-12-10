import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-delete-survey',
  templateUrl: './delete-survey.component.html',
  styleUrls: ['./delete-survey.component.css']
})
export class DeleteSurveyComponent implements OnInit {
  @Input() survey: number;
  @Output() deleted = new EventEmitter();

  constructor(
    private surveyService: SurveyService
  ) { }

  ngOnInit() {
    console.log(this.survey, ' delete survey')
  }

  onDelete() {
    this.surveyService.deleteSurvey(this.survey)
        .subscribe(
          data => this.deleted.emit(this.survey),
          err => console.log(err)
        )
  }

}
