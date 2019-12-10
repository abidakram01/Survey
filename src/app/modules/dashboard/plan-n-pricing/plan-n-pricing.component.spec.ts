import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanNPricingComponent } from './plan-n-pricing.component';

describe('PlanNPricingComponent', () => {
  let component: PlanNPricingComponent;
  let fixture: ComponentFixture<PlanNPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanNPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanNPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
