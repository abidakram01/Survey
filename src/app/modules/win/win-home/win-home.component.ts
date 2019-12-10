import { Component, OnInit } from '@angular/core';
import { WinService } from '../services';
import { IWinCompanyInfo } from 'src/app/shared';

@Component({
  selector: 'app-win-home',
  templateUrl: './win-home.component.html',
  styleUrls: ['./win-home.component.css']
})
export class WinHomeComponent implements OnInit {

  companies: IWinCompanyInfo[];

  constructor(private winService: WinService) { }

  ngOnInit() {
    // this.loadCompanies();
  }

  loadCompanies() {
    this.winService.getCompanies()
        .subscribe(
          data => {
            console.log(data);
            this.companies = data;
          },
          error => {console.error(error); }
        );
  }
}
