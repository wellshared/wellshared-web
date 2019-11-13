import { TestBed } from '@angular/core/testing';

import { CanonicalService } from './canonical.service';

describe('ChronicalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanonicalService = TestBed.get(CanonicalService);
    expect(service).toBeTruthy();
  });
});
