import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTalleresComponent } from './ver-talleres.component';

describe('VerTalleresComponent', () => {
  let component: VerTalleresComponent;
  let fixture: ComponentFixture<VerTalleresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerTalleresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerTalleresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
