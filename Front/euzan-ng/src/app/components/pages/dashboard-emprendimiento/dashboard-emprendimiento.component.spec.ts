import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmprendimientoComponent } from './dashboard-emprendimiento.component';

describe('DashboardEmprendimientoComponent', () => {
  let component: DashboardEmprendimientoComponent;
  let fixture: ComponentFixture<DashboardEmprendimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEmprendimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardEmprendimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
