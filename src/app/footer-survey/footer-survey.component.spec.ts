import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSurveyComponent } from './footer-survey.component';

describe('FooterSurveyComponent', () => {
  let component: FooterSurveyComponent;
  let fixture: ComponentFixture<FooterSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
