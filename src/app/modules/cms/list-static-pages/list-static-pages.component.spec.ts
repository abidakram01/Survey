import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStaticPagesComponent } from './list-static-pages.component';

describe('ListStaticPagesComponent', () => {
  let component: ListStaticPagesComponent;
  let fixture: ComponentFixture<ListStaticPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStaticPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStaticPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
