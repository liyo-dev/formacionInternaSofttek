import { Component } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router'; // Importa el Router

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private dataService: DataService, private router: Router) {} 

  observables() {
    this.dataService.onShowMenu.next(false);

    this.router.navigate(['/observables-suscripciones']);
  }

  ciclos(){
    this.dataService.onShowMenu.next(false);

    this.router.navigate(['/ciclos-vida']);
  }
}
