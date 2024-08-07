import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerRepartidorComponent } from './banner-repartidor.component';

describe('BannerRepartidorComponent', () => {
  let component: BannerRepartidorComponent;
  let fixture: ComponentFixture<BannerRepartidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerRepartidorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BannerRepartidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
