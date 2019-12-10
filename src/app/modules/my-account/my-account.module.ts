import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule } from 'ngx-img-cropper';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { ReferFriendComponent } from './refer-friend/refer-friend.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { ProfileComponent } from './profile/profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations:
   [
     ReferFriendComponent,
    TransactionHistoryComponent,
    BillingDetailsComponent,
     AccountSummaryComponent,
     ProfileComponent,
     UserProfileComponent,
     CompanyProfileComponent,
     PreferencesComponent,
     ChangePasswordComponent,
    ],
  imports: [
    CommonModule,
    MyAccountRoutingModule,
    NgbTabsetModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ImageCropperModule
  ]
})
export class MyAccountModule { }
