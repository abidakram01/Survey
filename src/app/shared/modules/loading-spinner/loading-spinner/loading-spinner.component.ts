/**
 * This component is used for display loader on every service calls.
 * This component uses a onPush strategy.
 * ie, the change detection is disabled in this component and instead
 * the change detection is triggered manually usingChangeDetectorRef
 * https://netbasal.com/a-comprehensive-guide-to-angular-onpush-change-detection-strategy-5bac493074a4
 */
import { Component, OnInit, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { HTTPStatus } from '../../../helpers/httpconfig.interceptor';
import { ViewRef_ } from '@angular/core/src/view';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit, AfterViewInit, OnDestroy {
  public loaderStatus: boolean;
  private unsubscribe: Subject<void> = new Subject();
  constructor(
    private httpStatus: HTTPStatus,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.httpStatus.getHttpStatus()
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(
      (status: boolean) => {
        this.loaderStatus = status;
        // triggering on change detection manually
        this.detectChanges();
      }
    );
  }

  ngAfterViewInit(): void {
    // Called after when the component's view has been initialized.
    // detach the change detectors after change detection has been
    // performed for the first time
    this.cdr.detach();
  //  this.router.events
  //       .subscribe((event) => {
  //           if(event instanceof NavigationStart) {
  //               this.loaderStatus = true;
  //           }
  //           else if (
  //               event instanceof NavigationEnd || 
  //               event instanceof NavigationCancel
  //               ) {
  //               this.loaderStatus = false;
  //           }
  //       });
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * To trigger change detection
   */
  detectChanges() {
    if ( this.cdr !== null &&
      this.cdr !== undefined &&
      ! (this.cdr as ViewRef_).destroyed ) {
      this.cdr.detectChanges();
    }
  }

}

