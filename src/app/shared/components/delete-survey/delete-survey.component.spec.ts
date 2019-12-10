import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSurveyComponent } from './delete-survey.component';

describe('DeleteSurveyComponent', () => {
  let component: DeleteSurveyComponent;
  let fixture: ComponentFixture<DeleteSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
