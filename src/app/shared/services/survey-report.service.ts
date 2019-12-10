import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SurveyReportService {

  constructor(private http: HttpClient) { }

  getSurveyReport(survey_id: number) {
    const urlString = env.apiUrl.surveyReport;
    const url = urlString(survey_id);
    return this.http.get(url);
  }
}
