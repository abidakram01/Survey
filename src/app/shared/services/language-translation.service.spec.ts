import { TestBed } from '@angular/core/testing';

import { LanguageTranslationService } from './language-translation.service';
import { HttpClientModule } from '@angular/common/http';

describe('LanguageTranslationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: LanguageTranslationService = TestBed.get(LanguageTranslationService);
    expect(service).toBeTruthy();
  });
});
