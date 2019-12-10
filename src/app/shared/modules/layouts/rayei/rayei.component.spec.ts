import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RayeiComponent } from './rayei.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LanguageTranslationModule } from '../../language-translation/language-translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LanguageTranslationService } from 'src/app/shared/services/language-translation.service';
import { NavBarService } from 'src/app/shared/services/nav-bar.service';

describe('RayeiComponent', () => {
  let component: RayeiComponent;
  let fixture: ComponentFixture<RayeiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RayeiComponent ],
      imports: [
        RouterTestingModule,
        LanguageTranslationModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        LanguageTranslationService,
        NavBarService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RayeiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
