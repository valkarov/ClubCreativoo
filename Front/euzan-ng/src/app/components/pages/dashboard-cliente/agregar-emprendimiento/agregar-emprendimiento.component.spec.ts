import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEmprendimientoComponent } from './agregar-emprendimiento.component';

describe('AgregarEmprendimientoComponent', () => {
  let component: AgregarEmprendimientoComponent;
  let fixture: ComponentFixture<AgregarEmprendimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarEmprendimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarEmprendimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
