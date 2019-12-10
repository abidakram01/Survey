import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualPlansComponent } from './individual-plans.component';

describe('IndividualPlansComponent', () => {
  let component: IndividualPlansComponent;
  let fixture: ComponentFixture<IndividualPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
