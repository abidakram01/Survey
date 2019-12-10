import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyReportsComponent } from './survey-reports.component';

describe('SurveyReportsComponent', () => {
  let component: SurveyReportsComponent;
  let fixture: ComponentFixture<SurveyReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
