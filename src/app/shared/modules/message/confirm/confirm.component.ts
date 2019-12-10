import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit {
  @Input()
  data: {message?: string, title?: string, yesText?: string, noText?: string};

  yesText = 'Yes';
  noText = 'No';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    if (this.data.hasOwnProperty('yesText') && this.data.yesText) {
      this.yesText = this.data.yesText;
    }

    if (this.data.hasOwnProperty('noText') && this.data.noText) {
      this.noText = this.data.noText;
    }
  }

  /**
   * Method to get confirm message feedback
   */
  confirmModalFeedback(feedback: boolean) {
    if (feedback) {
      this.activeModal.close(true);
    } else {
      this.activeModal.close(false);
    }
  }

}
