import { TestBed } from '@angular/core/testing';

import { CompanySurveysService } from './company-surveys.service';

describe('CompanySurveysService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanySurveysService = TestBed.get(CompanySurveysService);
    expect(service).toBeTruthy();
  });
});
