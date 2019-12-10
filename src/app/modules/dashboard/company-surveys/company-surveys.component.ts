import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../../../shared/services/dashboard.service';

@Component({
  selector: 'app-company-surveys',
  templateUrl: './company-surveys.component.html',
  styleUrls: ['./company-surveys.component.css']
})
export class CompanySurveysComponent implements OnInit {
  surveys: any[];

  @Input()
  company: number;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.loadSurveys();
  }

  /**
   * Calls shared service method to show account modal
   */
  openCreateSurveyModal() {
    this.dashboardService.displayDashboardModal();
  }

  loadSurveys(){
    this.dashboardService.getCompanySurveys(this.company)
        .subscribe(
          (data: []) => { this.surveys = data; },
          err => console.log(err)
        )
  }

  onDelete(surveyId: number) {
    alert("Survey deleted");
    this.surveys = this.surveys.filter(survey => survey.id != surveyId);
  }

  onSurveyDisable(surveyId: number) {
    this.surveys = this.surveys.map(survey => {
      if(survey.id == surveyId)
        survey['status'] = survey['status'] === 'active' ? 'expired' : 'active';
      return survey
  });
  }
}
