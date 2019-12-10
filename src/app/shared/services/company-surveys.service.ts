import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CompanySurveysService {

  constructor(
    private http: HttpClient
  ) { }

  getCompanyToken(company_id: number) {
    const urlString = env.apiUrl.companyToken;
    const url = urlString(company_id);
    return this.http.get(url);
  }

  getCompanySurveys(company_id: string) {
    const urlString = env.apiUrl.companyTokenSurveys;
    const url = urlString(company_id);
    return this.http.get(url);
  }
}
