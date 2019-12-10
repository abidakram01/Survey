import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinHomeComponent } from './win-home.component';
import { CompanyComponent } from '../company';
import { RouterTestingModule } from '@angular/router/testing';
import { LanguageTranslationModule } from 'src/app/shared/modules/language-translation/language-translation.module';
import { LanguageTranslationService } from 'src/app/shared/services/language-translation.service';
import { HttpClientModule } from '@angular/common/http';
import { WinService } from '../services';
import { SurveyService } from 'src/app/shared/services/survey.service';

describe('WinHomeComponent', () => {
  let component: WinHomeComponent;
  let fixture: ComponentFixture<WinHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WinHomeComponent,
        CompanyComponent
      ],
      imports: [
        RouterTestingModule,
        LanguageTranslationModule,
        // FormsModule,
        // ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        LanguageTranslationService,
        WinService,
        SurveyService
        // NavBarService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
