import { TestBed } from '@angular/core/testing';

import { emprendimientoGuard } from './emprendimiento.guard';

describe('emprendimientoGuard', () => {
  let guard: emprendimientoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(emprendimientoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});