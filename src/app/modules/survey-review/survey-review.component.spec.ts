import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyReviewComponent } from './survey-review.component';

describe('SurveyReviewComponent', () => {
  let component: SurveyReviewComponent;
  let fixture: ComponentFixture<SurveyReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
