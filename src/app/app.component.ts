import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./menu/menu.component";
import { Subscription } from 'rxjs';
import { DataService } from './data.service';
import { LoadingComponent } from "./loading/loading.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {

  title = 'formacionInterna1';
  isLoading: boolean = false;
  showMenu: boolean = true;

  // Manejo de suscripciones con Subscription
  private subs: Subscription = new Subscription();

  constructor(private dataService: DataService) {}

  ngAfterViewInit(): void {
    this.subs.add(
      this.dataService.onShowExampleDetail$.subscribe((_showMenu) => {
        this.showMenu = _showMenu;
      })
    );

    this.subs.add(
      this.dataService.onShowLoading$.subscribe((_isLoading) => {
        this.isLoading = _isLoading;
      })
    );
  }

  ngOnDestroy(): void {
    // Libera todas las suscripciones
    this.subs.unsubscribe();
  }
}
