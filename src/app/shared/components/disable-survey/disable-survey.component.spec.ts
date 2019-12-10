import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableSurveyComponent } from './disable-survey.component';

describe('DisableSurveyComponent', () => {
  let component: DisableSurveyComponent;
  let fixture: ComponentFixture<DisableSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisableSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisableSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
