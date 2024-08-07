import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SobreNosotrosBannerComponent } from './sobre-nosotros-banner.component';

describe('SobreNosotrosBannerComponent', () => {
  let component: SobreNosotrosBannerComponent;
  let fixture: ComponentFixture<SobreNosotrosBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SobreNosotrosBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SobreNosotrosBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
