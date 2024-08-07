import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntasFrecuentesCarouselComponent } from './preguntas-frecuentes-carousel.component';

describe('PreguntasFrecuentesCarouselComponent', () => {
  let component: PreguntasFrecuentesCarouselComponent;
  let fixture: ComponentFixture<PreguntasFrecuentesCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreguntasFrecuentesCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreguntasFrecuentesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
