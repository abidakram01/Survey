import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStaticPageComponent } from './create-static-page.component';

describe('CreateStaticPageComponent', () => {
  let component: CreateStaticPageComponent;
  let fixture: ComponentFixture<CreateStaticPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStaticPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStaticPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
