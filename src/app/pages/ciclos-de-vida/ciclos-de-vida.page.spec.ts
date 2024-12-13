import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiclosDeVidaPage } from './ciclos-de-vida.page';

describe('CiclosDeVidaPage', () => {
  let component: CiclosDeVidaPage;
  let fixture: ComponentFixture<CiclosDeVidaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiclosDeVidaPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CiclosDeVidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
