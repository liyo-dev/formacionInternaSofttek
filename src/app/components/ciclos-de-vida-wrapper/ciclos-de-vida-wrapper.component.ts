import { Component } from '@angular/core';
import { CiclosDeVidaPage } from '../../pages/ciclos-de-vida/ciclos-de-vida.page';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ciclos-vida-wrapper',
  templateUrl: './ciclos-de-vida-wrapper.component.html',
  styleUrls: ['./ciclos-de-vida-wrapper.component.css'],
  standalone: true,
  imports: [FormsModule, CiclosDeVidaPage],
})
export class CiclosDeVidaWrapperComponent {
  parentInputValue = 'Valor inicial';
}
