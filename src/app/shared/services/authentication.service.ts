import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Local Storage package
// https://www.npmjs.com/package/@ngx-pwa/local-storage
import { LocalStorage } from '@ngx-pwa/local-storage';

// JWT helper package
// https://www.npmjs.com/package/@auth0/angular-jwt
import { JwtHelperService } from '@auth0/angular-jwt';


import { environment as env } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { IUserProfile } from '../interfaces';
import { IHttpResponse } from '../interfaces';
import { LanguageTranslationService } from './language-translation.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userProfile: IUserProfile;
  private userProfileSubject = new BehaviorSubject<IUserProfile>(this.userProfile);
  userData = this.userProfileSubject.asObservable();

  private userAuthSubject = new Subject<boolean>();
  userAuth$ = this.userAuthSubject.asObservable();

  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorage,
    private languageTranslation: LanguageTranslationService,
    private router: Router,
  ) { }

  /**
   * Authenticates user
   * @param loginData User authentication data
   */
  authenticateUser(loginData) {
    return this.http.post(env.apiUrl.login, loginData)
      .pipe(
        map(
          (response: any) => {
            // Gets login response and stores access token in local storage
            if (response && response.hasOwnProperty('token')) {
              this.localStorage.setItemSubscribe(
                'access_token',
                response.token
              );

              this.localStorage.setItemSubscribe(
                'is_authenticated',
                true
              );
              const profile = this.setUserProfile()
            .subscribe(
              (data: IUserProfile) => {
                this.userProfile = data;
                // console.log(data);
                this.setAccountStatus(true);
              },
            err => console.log(err, ' err'));
            }
            return response;
          }
        )
      );
  }

  /**
   * Method make service calls to get user and master data.
   * On getting response, the user and master data will be stored in the
   * local storage
   */
  setUserAndMasterData() {
    // Gets user profile details and stores it in local storage
    this.setUserProfile();
    // Gets master data and stores it in local storage
    this.setMasterData();
  }

  /**
   * Method gets the master data for the sites and
   * stores it in the local storage
   */
  setMasterData() {
     this.http.get(env.apiUrl.getLookup);
  }

  getMasterData() {
    return this.http.get(env.apiUrl.fetchMaster);
  }

  setAccountStatus(status) {
    this.userAuthSubject.next(status);
  }

  getUserProfile(): any {
    if (!this.userProfile) {
      this.setUserProfile()
        .subscribe(
          (data: IUserProfile) => {
            this.userProfile = data;
            // console.log(data);

          },
          err => console.log(err, ' err'));
    }
    return this.userProfile;

  }

  /**
   * Method get the user info and store it the local storage
   */
  setUserProfile() {
    return this.http.get(env.apiUrl.getUserProfile)
      .pipe(
        map((data: IUserProfile) => {
          this.userProfile = data;
          this.localStorage.setItemSubscribe(
            'userData',
            data
          );
          if(this.userProfile.language_code){
            this.languageTranslation.onLanguageChange(this.userProfile.language_code);
          }
          return data;
        })
      );
  }

  signOut(isClientOnly = false) {
    // Checks flag to singout only for client
    if (!isClientOnly) {
      // singout from server side
      this.invalidateToken().subscribe(
        () => {}
      );
    }
    this.localStorage.removeItemSubscribe('is_authenticated');
        this.localStorage.removeItemSubscribe('access_token');
        this.localStorage.removeItemSubscribe('userData');
        this.localStorage.removeItemSubscribe('survey_types');
        this.setAccountStatus(false);
    // call signout api here
  }

  changePassword(data) {
    return this.http.post(env.apiUrl.getChangePasswordUrl, data);
  }

  resetPassword(data) {
    return this.http.post(env.apiUrl.getResetPasswordUrl, data);
  }

  invalidateToken() {
    return this.http.post(env.signOut(), '');
  }

  forgotPassword(data) {
    return this.http.post(env.apiUrl.getForgotPasswordUrl, data);
  }


  setUserProfileForDashboard(): Promise<boolean> {
    return new Promise(resolve => {
      this.localStorage.getItem('access_token').subscribe((token) => {
        this.http.get(env.apiUrl.getUserProfile)
          .subscribe((data: IUserProfile) => {
            this.userProfile = data;
            this.userProfileSubject.next(this.userProfile);
            resolve(true);
          }, err => console.log(err, ' err'));

      });

    });
  }


  isAuthenticated(): Observable<boolean> {
    return this.localStorage.getItem<string>('access_token').pipe(
      map(
        (token: string) => {
          if (token) {
            // Checks if token is expired, navigates to home after signout
            // if (this.jwtHelper.isTokenExpired(token)) {
            //   this.signOut();
            //   this.router.navigateByUrl('/');
            //   return false;
            // } else {
              return true;
            // }
          } else {
            this.signOut(true);
            this.router.navigateByUrl('/');
            return false;
          }
        },
        (error) => {
          // Call singout method to remove auth related data from local storage
          this.signOut(true);
          this.router.navigateByUrl('/');
          return false;
        }
      )
    );
  }

}
