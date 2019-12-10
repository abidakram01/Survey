import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyViewContainerComponent } from './survey-view-container.component';

describe('SurveyViewContainerComponent', () => {
  let component: SurveyViewContainerComponent;
  let fixture: ComponentFixture<SurveyViewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyViewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
