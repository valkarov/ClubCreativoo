import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEmprendimientosComponent } from './gestion-emprendimientos.component';

describe('GestionEmprendimientosComponent', () => {
  let component: GestionEmprendimientosComponent;
  let fixture: ComponentFixture<GestionEmprendimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionEmprendimientosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionEmprendimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
