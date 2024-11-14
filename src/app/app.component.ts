import { Component, AfterViewInit, OnDestroy } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { Subscription } from "rxjs";
import { LoadingComponent } from "./components/loading/loading.component";
import { MenuComponent } from "./components/menu/menu.component";
import { DataService } from "./data.service";


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

  constructor(private dataService: DataService, public router: Router) {}

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
