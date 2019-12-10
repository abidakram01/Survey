import { TestBed } from '@angular/core/testing';

import { SurveyReportService } from './survey-report.service';

describe('SurveyReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SurveyReportService = TestBed.get(SurveyReportService);
    expect(service).toBeTruthy();
  });
});
