import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletarInfoComponent } from './completar-info.component';

describe('CompletarInfoComponent', () => {
  let component: CompletarInfoComponent;
  let fixture: ComponentFixture<CompletarInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletarInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompletarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
