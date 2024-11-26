import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiclosDeVidaWrapperComponent } from './ciclos-de-vida-wrapper.component';

describe('CiclosDeVidaWrapperComponent', () => {
  let component: CiclosDeVidaWrapperComponent;
  let fixture: ComponentFixture<CiclosDeVidaWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiclosDeVidaWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CiclosDeVidaWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
