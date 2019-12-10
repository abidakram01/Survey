import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { RegistrationService } from 'src/app/shared/services/registration.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {
  status: Observable<any>;
  verified: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private registerService: RegistrationService
  ) { }

  ngOnInit() {
    this.status = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        const token = params.get('token');
          return this.registerService.activateAccount(token);
      }, error=> {return error})
    );
    this.status.subscribe(
      data=> this.verified = true,
      error => this.verified = false
    )
  }

}
