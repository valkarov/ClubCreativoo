import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEmprendimientoAdminsComponent } from './gestion-emprendimiento-admins.component';

describe('GestionEmprendimientoAdminsComponent', () => {
  let component: GestionEmprendimientoAdminsComponent;
  let fixture: ComponentFixture<GestionEmprendimientoAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionEmprendimientoAdminsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionEmprendimientoAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
