import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { SurveyReportService } from 'src/app/shared/services/survey-report.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-survey-report',
  templateUrl: './survey-report.component.html',
  styleUrls: ['./survey-report.component.css']
})
export class SurveyReportComponent implements OnInit {
  public charts = [];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{ ticks: {min: 0}}]
    }
  };
  public barChartLabels: string[];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[];

  public tables = [];
  public report;
  public survey_id: number;
  public baseUrl: string = environment.apiDomain;

  constructor(
    private route: ActivatedRoute,
    private reportService: SurveyReportService
    ) {
      let i = 0;
    const survey_id = this.route.snapshot.params['id'];
    this.survey_id = survey_id;
    this.reportService.getSurveyReport(survey_id).subscribe(
      (reportData) => {
        this.report = reportData;
         Object.keys(this.report.question).forEach(question => {
          const answerData = this.report.question[question].answers;
          const questionType = this.report.question[question].type;
          const tBarChartData = [];

          if ( questionType === 0) {
            this.tables[i] = {question: question, answers: []};
            Object.keys(answerData).forEach(answer => {
              this.tables[i].answers.push({ answer: answer, count: answerData[answer] });
            });
          } else {
            Object.keys(answerData).forEach(answer => {
              tBarChartData.push({ data: [answerData[answer]], label: answer });
            });
            if(tBarChartData.length > 0){
              this.charts.push({
                data: tBarChartData,
                label: [question],
                type: this.barChartType,
                legend: this.barChartLegend,
                option: this.barChartOptions
              });
            }
          }
        });
      }
    );
  }

  ngOnInit() {
    this.barChartType = 'bar';
    this.barChartLegend = true;
  }
}

