import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { switchMap } from 'rxjs/operators';
import { CompanySurveysService } from 'src/app/shared/services/company-surveys.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {

  company_id: string;
  surveys: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companySurveysService: CompanySurveysService
  ) {}

  ngOnInit() {
    this.surveys = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.company_id = params.get('id');
        return this.companySurveysService.getCompanySurveys(this.company_id);
      })
    );
  }

}
