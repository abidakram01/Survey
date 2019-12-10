/**
 * HTTP Interceptor
 * https://scotch.io/@vigneshsithirai/angular-6-7-http-client-interceptor-with-error-handling
 * https://medium.com/@aleixsuau/error-handling-angular-859d529fa53a
 */
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, retry, catchError, finalize, delay, mergeMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/index';

import { environment as env } from '../../../environments/environment';
// Local Storage package
// https://www.npmjs.com/package/@ngx-pwa/local-storage
import { LocalStorage } from '@ngx-pwa/local-storage';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

/**
 * HTTPStatus Class used for showing and hiding page loader/spinner
 * https://netbasal.com/a-comprehensive-guide-to-angular-onpush-change-detection-strategy-5bac493074a4
 */
@Injectable()
export class HTTPStatus {
  private requestInFlight$: BehaviorSubject<boolean>;
  constructor() {
    this.requestInFlight$ = new BehaviorSubject(false);
  }

  setHttpStatus(inFlight: boolean) {
    this.requestInFlight$.next(inFlight);
  }

  getHttpStatus(): Observable<boolean> {
    return this.requestInFlight$.asObservable();
  }
}

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private status: HTTPStatus,
    private localStorage: LocalStorage,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Activating page loader
    this.status.setHttpStatus(true);
    /**
     * Async Interceptor:
     * https://medium.com/@johnmeguira/intercept-all-http-calls-with-angular-5-to-display-a-loader-281924b73ad8
     * https://medium.com/@danielcrisp/async-http-interceptors-with-angular-4-3-9e6e795da562
     */
    return this.getAccessToken().pipe(
      mergeMap(
        (token) => {
          if (
            !request.url.includes(env.apiUrl.login) &&
            !request.url.includes(env.apiUrl.singup)
          ) {
            if (token) {
              // this.setAccessToken(request, token);
              request = request.clone({
                headers: request.headers.set('Authorization', 'Token ' + token)
              });
            }
          }
          // if(request.url.includes(env.apiUrl.recentSurveys) && request.url){
          //   if (token) {
          //     // this.setAccessToken(request, token);
          //     request = request.clone({
          //       headers: request.headers.set('Authorization', 'Token ' + token)
          //     });
          //   }  
          // }
          
            if (token) {
              // this.setAccessToken(request, token);
              request = request.clone({
                headers: request.headers.set('Authorization', 'Token ' + token)
              });
            }
          
          if (
            !request.url.includes('user-details') &&
            !request.url.includes(env.apiUrl.contactUsAPI)
          ) {
            if (!request.headers.has('Content-Type')) {
              request = request.clone({
                headers: request.headers.set('Content-Type', 'application/json')
              });
            }
          }

          return next.handle(request).pipe(
            // retry(3), // Retry 3 times
            // delay(3000),
            map((event: HttpEvent<any>) => {
              // if (event instanceof HttpResponse) {
              // }
              return event;
            }),
            catchError((error: HttpErrorResponse) => {
              if (error.status === 401) {
                // auto logout if 401 response returned from api
                this.localStorage.removeItemSubscribe('is_authenticated');
                this.localStorage.removeItemSubscribe('access_token');
                this.localStorage.removeItemSubscribe('userData');
                this.authenticationService.setAccountStatus(false);
                this.router.navigate(['/']);
              }

              const err = error.error.message || error.statusText;
              console.log(err);
              return throwError(error.message);
            }),
            finalize(() => {
              // De-activating page loader
              this.status.setHttpStatus(false);
            }),
            finalize(() => {
              this.status.setHttpStatus(false);
            })
          );
        }
      )
    );

  }

  /**
   * Sets Access token
   * @param request Http Request Object
   * @param token Auth token string
   */
  setAccessToken(request, token) {

  }

  /**
   * Sets Content Type Headers
   * @param request Http Request Object
   */
  setContentType(request) {

  }

  /**
   * Sets Access token
   */
  getAccessToken() {
    return this.localStorage.getItem<string>(
      'access_token',
      { schema: { type: 'string' } }
    );
  }
}
