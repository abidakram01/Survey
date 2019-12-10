import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAvailableSurveysComponent } from './user-available-surveys.component';

describe('UserAvailableSurveysComponent', () => {
  let component: UserAvailableSurveysComponent;
  let fixture: ComponentFixture<UserAvailableSurveysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAvailableSurveysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAvailableSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
