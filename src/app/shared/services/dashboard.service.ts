/**
 * Angular Shared service for dashboard
 * https://angular.io/guide/component-interaction#parent-and-children-communicate-via-a-service
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IUserProfile } from 'src/app/shared';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { LocalStorage } from '@ngx-pwa/local-storage';


@Injectable()
export class DashboardService {
  private dashboardCreateModalSource = new Subject<boolean>();
  public dashboardCreateModalAction$ = this.dashboardCreateModalSource.asObservable();
  private userProfile: IUserProfile;

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient,
    private localStorage: LocalStorage) {
      // this.setUserProfile();
  }

  /**
   * Trigger display Account Modal
   */
  displayDashboardModal() {
    this.dashboardCreateModalSource.next();
  }
  setUserProfile() {
    this.localStorage.getItem('userData')
        .subscribe((profile: any) => {
          this.userProfile = profile.value;
        });
  }


  getCompanyProfile(companyId: number) {
    return this.http.get(env.apiUrl.companyProfile);
  }

  getRecentSurveys(companyId: number) {
    return this.http.get(env.apiUrl.recentSurveys + companyId + '/2');
  }

  getCompanySurveys(company_id: number) {
    const urlString = env.apiUrl.companySurveys +'/?page_size=20&page=1&created_by__id='+company_id+'&ordering=-created_at';
    // const url = urlString(company_id);
    return this.http.get(urlString);
  }

  getSurveyCount(companyId: number) {
    return this.http.get(env.apiUrl.surveyCount);
  }
}
