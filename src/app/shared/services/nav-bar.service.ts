/**
 * Angular Shared service for navbar button actions
 * https://angular.io/guide/component-interaction#parent-and-children-communicate-via-a-service
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorage } from '@ngx-pwa/local-storage';


@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  private accountNavBtnSource = new Subject<boolean>();
  public accountNavBtnAction$ = this.accountNavBtnSource.asObservable();

  private forgotPasswordLinkActionSource = new Subject<{islogin: boolean, isForgot: boolean}>();
  public forgotPasswordLinkAction$ = this.forgotPasswordLinkActionSource.asObservable();

  private passwordNavBtnSource = new Subject<boolean>();
  public passwordNavBtnAction$ = this.passwordNavBtnSource.asObservable();

  constructor(private http: HttpClient, private localStorage: LocalStorage) { }

  /**
   * Trigger display Account Modal
   */
  displayAccountModal(modalStatus) {
    this.accountNavBtnSource.next(modalStatus);
  }

  /**
   * Trigger display Change Password Modal
   */
  displayPasswordModal() {
    this.passwordNavBtnSource.next(true);
  }

  /**
   * To show forgot password
   */
  showForgotPassword(data) {
    this.forgotPasswordLinkActionSource.next(data);
  }

   /**
   * Authenticates user
   * @param loginData User authentication data
   */
  // getCategoryList() {
  //   return this.http.get(env.apiUrl.  );
  // }

}
