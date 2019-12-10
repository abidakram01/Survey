import { TestBed } from '@angular/core/testing';

import { ProfileUpdateService } from './profile-update.service';

describe('ProfileUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileUpdateService = TestBed.get(ProfileUpdateService);
    expect(service).toBeTruthy();
  });
});
