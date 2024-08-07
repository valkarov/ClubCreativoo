import { TestBed } from '@angular/core/testing';

import { repartidorGuard } from './repartidor.guard';

describe('repartidorGuard', () => {
  let guard: repartidorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(repartidorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});