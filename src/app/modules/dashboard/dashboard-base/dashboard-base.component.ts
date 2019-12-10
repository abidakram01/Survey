import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard-base',
  templateUrl: './dashboard-base.component.html',
  styleUrls: ['./dashboard-base.component.css']
})
export class DashboardBaseComponent implements OnInit, OnDestroy {
  public userType = 0; // zzz
  // Dashboard Modal Name
  @ViewChild('createSurvey')
  modalName: string;
  company_id: number;

  private dashboardServiceSubscription: Subject<void> = new Subject();

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private dashboardService: DashboardService,
  ) {
    // Shared Service function of DashboardService to display the create survey modal
    this.dashboardService.dashboardCreateModalAction$
    .pipe(takeUntil(this.dashboardServiceSubscription))
    .subscribe(
      () => {
        this.OnCreateSurveyClick();
        // this.modalService.open(this.modalName)
      }
    );
  }

  ngOnInit() {
  }

  // Called once, before the instance is destroyed.
  ngOnDestroy() {
    this.dashboardServiceSubscription.next();
    this.dashboardServiceSubscription.complete();
  }

  open(content) {
    this.modalService.open(content);
  }

  /**
   * TODO: del this on commit, this is a temp func. to hide c
   */
  OnCreateSurveyClick() {
    this.modalService.dismissAll();
    this.router.navigate(['/survey/start-survey']);
  }

  changeCompanyId(value) {
    this.company_id = value;
  }
}
