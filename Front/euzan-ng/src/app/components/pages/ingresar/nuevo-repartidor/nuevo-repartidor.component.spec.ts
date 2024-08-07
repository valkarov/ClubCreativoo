import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoRepartidorComponent } from './nuevo-repartidor.component';

describe('NuevoRepartidorComponent', () => {
  let component: NuevoRepartidorComponent;
  let fixture: ComponentFixture<NuevoRepartidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoRepartidorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevoRepartidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
