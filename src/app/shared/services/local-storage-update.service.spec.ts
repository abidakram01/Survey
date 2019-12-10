import { TestBed } from '@angular/core/testing';

import { LocalStorageUpdateService } from './local-storage-update.service';

describe('LocalStorageUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalStorageUpdateService = TestBed.get(LocalStorageUpdateService);
    expect(service).toBeTruthy();
  });
});
