import { TestBed } from '@angular/core/testing';

import { RoomTimeIntervalService } from './room-time-interval.service';

describe('RoomTimeIntervalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomTimeIntervalService = TestBed.get(RoomTimeIntervalService);
    expect(service).toBeTruthy();
  });
});
