import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LanguageTranslationModule } from 'src/app/shared/modules/language-translation/language-translation.module';
import { LanguageTranslationService } from 'src/app/shared/services/language-translation.service';
import { NavBarService } from 'src/app/shared/services/nav-bar.service';
import { LoginComponent } from 'src/app/shared/modules/layouts/rayei/login/login.component';
import { SignupComponent } from 'src/app/shared/modules/layouts/rayei/signup/signup.component';
import { ForgotPasswordComponent } from 'src/app/shared/modules/layouts/rayei/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CompanyComponent, WinHomeComponent } from '../../win';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        LoginComponent,
        SignupComponent,
        ForgotPasswordComponent,
        CompanyComponent,
        WinHomeComponent,
      ],
      imports: [
        RouterTestingModule,
        LanguageTranslationModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        LanguageTranslationService,
        NavBarService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
