import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySurveysComponent } from './company-surveys.component';

describe('CompanySurveysComponent', () => {
  let component: CompanySurveysComponent;
  let fixture: ComponentFixture<CompanySurveysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySurveysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
