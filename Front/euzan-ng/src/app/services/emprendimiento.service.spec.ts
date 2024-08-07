import { TestBed } from '@angular/core/testing';

import { EmprendimientoService } from './emprendimiento.service';

describe('EmprendimientoService', () => {
  let service: EmprendimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmprendimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
