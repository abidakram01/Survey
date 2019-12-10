import { TestBed } from '@angular/core/testing';

import { UserCollectService } from './user-collect.service';

describe('UserCollectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserCollectService = TestBed.get(UserCollectService);
    expect(service).toBeTruthy();
  });
});
