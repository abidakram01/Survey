import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad  {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  canActivate(): Observable<boolean> {
    return this.authenticationService.isAuthenticated();
  }

  canLoad(): Observable<boolean> {
    return this.authenticationService.isAuthenticated();
  }


}
