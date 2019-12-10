import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef,
  OnDestroy,
  HostListener
} from '@angular/core';
import { SurveyDataService } from 'src/app/shared/services/survey-data.service';
import { ViewRef_ } from '@angular/core/src/view';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { SurveyTabStatus } from 'src/app/shared/enum/SurveyTab';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManageComponent implements OnInit, OnDestroy {

  public tabIdData = SurveyTabStatus;

  public activeTabId = this.tabIdData.create;

  public previewSurveyTriggerUnsubscribe: Subject<void> = new Subject();
  public onSurveyStepChangeUnsubscribe: Subject<void> = new Subject();


  constructor(
    private cdr: ChangeDetectorRef,
    private surveyDataService: SurveyDataService,
    private localStorage: LocalStorage
  ) {

    // Listening to survey tab change events
    this.surveyDataService.onSurveyStepChange$.pipe(takeUntil(this.onSurveyStepChangeUnsubscribe)).subscribe(
      (nextTab: SurveyTabStatus) => this.onSurveyStepChange(nextTab)
    );
  }

  ngOnInit() {
    this.localStorage.getItem<string>('active-tab').subscribe(
      (activeTab: SurveyTabStatus) => {
        if (activeTab in this.tabIdData) {
          this.activeTabId = activeTab;
          // this.detectChanges();
        }
      }
    );
  }

  /**
   * Method will execute when user closes tab or refresh the page
   * @param $event Event
   */
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    // Deleting all survey data from local storage
    this.localStorage.removeItemSubscribe('active-tab');
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    // Unsubscribing from shared services
    this.previewSurveyTriggerUnsubscribe.next();
    this.previewSurveyTriggerUnsubscribe.complete();

    this.onSurveyStepChangeUnsubscribe.next();
    this.onSurveyStepChangeUnsubscribe.complete();

    // Deleting all survey data from local storage
    this.localStorage.removeItemSubscribe('survey');
    this.localStorage.removeItemSubscribe('active-tab');
    console.log('active-tab destroyed');
  }

  /**
   *
   * @param nextTab string Survey tab navigation
   */
  onSurveyStepChange(nextTab: SurveyTabStatus) {
    if (nextTab in this.tabIdData) {
      this.activeTabId = nextTab;
      this.localStorage.setItemSubscribe('active-tab', nextTab);
    }
  }

  /**
   * Method deletes old survey details and enable the Design Survey tab
   */
  createNewSurvey() {
    this.localStorage.removeItem('survey').subscribe(
      (data) => {
        this.localStorage.setItemSubscribe('active-tab', this.tabIdData.create);
        this.activeTabId = this.tabIdData.create;
        // this.detectChanges();
      }
    );
  }

  /**
   * To trigger change detection
   */
  detectChanges() {
    if (this.cdr !== null && this.cdr !== undefined && !(this.cdr as ViewRef_).destroyed) {
      this.cdr.detectChanges();
    }
  }

}
