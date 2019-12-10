import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { IWinCompanyInfo, IWinSurvey } from 'src/app/shared';

@Injectable()
export class WinService {

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<IWinCompanyInfo[]> {
    return this.http.get<IWinCompanyInfo[]>(env.apiUrl.winCompanyList);
  }

  getCompanySurveys(company_id: number): Observable<IWinSurvey[]> {
    return this.http.get<IWinSurvey[]>(env.apiUrl.winCompanySuveys + '/' + company_id);
  }
}
