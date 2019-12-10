import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { WinService } from '../services';
import { Observable } from 'rxjs';
import { IWinSurvey } from 'src/app/shared';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css']
})
export class SurveysComponent implements OnInit {
  company_id: number;
  surveys: Observable<IWinSurvey[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private winService: WinService
  ) {}

  ngOnInit() {
    this.surveys = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.company_id = +params.get('id');
        return this.winService.getCompanySurveys(this.company_id);
      })
    );
  }

}
