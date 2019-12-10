import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSurveyComponent } from './header-survey.component';

describe('HeaderSurveyComponent', () => {
  let component: HeaderSurveyComponent;
  let fixture: ComponentFixture<HeaderSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
