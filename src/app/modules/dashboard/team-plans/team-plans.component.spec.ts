import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPlansComponent } from './team-plans.component';

describe('TeamPlansComponent', () => {
  let component: TeamPlansComponent;
  let fixture: ComponentFixture<TeamPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
