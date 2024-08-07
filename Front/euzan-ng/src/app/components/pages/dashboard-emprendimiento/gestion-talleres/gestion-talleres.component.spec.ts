import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTalleresComponent } from './gestion-talleres.component';

describe('GestionTalleresComponent', () => {
  let component: GestionTalleresComponent;
  let fixture: ComponentFixture<GestionTalleresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionTalleresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionTalleresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
