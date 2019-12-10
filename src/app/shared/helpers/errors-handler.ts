/**
 * Class for Application error handling
 * https://medium.com/@aleixsuau/error-handling-angular-859d529fa53a
 */
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  /**
   * Does the Error Handling
   * @param error Error
   */
  handleError(error: Error | HttpErrorResponse) {
    // Gets router object
    const router = this.injector.get(Router);

    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
        // TODO: Show message to user and ask them to retry
        console.log('No Internet Connection');
        router.navigate(['/not-found']);
      } else {
        // Handle Http Error (error.status === 403, 404...)
        // TODO: Show message to user and ask them to retry
        console.log(`${error.status} - ${error.message}`);
        router.navigate(['/not-found']);
      }
    } else {
      if (error) {
        console.error(error);
      } else {
        console.log('In error Handler');
      }
      // router.navigate(['/server-error']);
    }

    // console.error(error);
  }
}
