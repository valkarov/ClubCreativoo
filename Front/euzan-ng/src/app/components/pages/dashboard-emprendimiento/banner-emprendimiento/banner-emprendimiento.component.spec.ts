import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerEmprendimientoComponent } from './banner-emprendimiento.component';

describe('BannerEmprendimientoComponent', () => {
  let component: BannerEmprendimientoComponent;
  let fixture: ComponentFixture<BannerEmprendimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerEmprendimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BannerEmprendimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
