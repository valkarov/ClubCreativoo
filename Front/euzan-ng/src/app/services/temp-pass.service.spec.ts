import { TestBed } from '@angular/core/testing';

import { TempPassService } from './temp-pass.service';

describe('TempPassService', () => {
  let service: TempPassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempPassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
