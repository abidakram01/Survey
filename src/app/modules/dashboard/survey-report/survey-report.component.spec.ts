import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyReportComponent } from './survey-report.component';

describe('SurveyReportComponent', () => {
  let component: SurveyReportComponent;
  let fixture: ComponentFixture<SurveyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
