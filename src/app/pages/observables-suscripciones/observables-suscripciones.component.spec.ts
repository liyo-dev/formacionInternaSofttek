import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservablesSuscripcionesComponent } from './observables-suscripciones.component';

describe('ObservablesSuscripcionesComponent', () => {
  let component: ObservablesSuscripcionesComponent;
  let fixture: ComponentFixture<ObservablesSuscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservablesSuscripcionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservablesSuscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
