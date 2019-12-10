import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExceptionComponent } from './modal-exception.component';

describe('ModalExceptionComponent', () => {
  let component: ModalExceptionComponent;
  let fixture: ComponentFixture<ModalExceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalExceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
