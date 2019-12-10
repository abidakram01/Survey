import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAttendedSurveysComponent } from './user-attended-surveys.component';

describe('UserAttendedSurveysComponent', () => {
  let component: UserAttendedSurveysComponent;
  let fixture: ComponentFixture<UserAttendedSurveysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAttendedSurveysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAttendedSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
