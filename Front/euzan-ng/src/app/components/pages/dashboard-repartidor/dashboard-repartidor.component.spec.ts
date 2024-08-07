import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRepartidorComponent } from './dashboard-repartidor.component';

describe('DashboardRepartidorComponent', () => {
  let component: DashboardRepartidorComponent;
  let fixture: ComponentFixture<DashboardRepartidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardRepartidorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardRepartidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
