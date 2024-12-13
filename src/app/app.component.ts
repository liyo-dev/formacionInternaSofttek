import { Component, AfterViewInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { Subscription } from "rxjs";
import { LoadingComponent } from "./components/loading/loading.component";
import { MenuComponent } from "./components/menu/menu.component";
import { DataService } from "./service/data.service";
import { CommonModule } from "@angular/common";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, LoadingComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {

  title = 'formacionInterna1';
  isLoading: boolean = false;
  showMenu: boolean = true;
  logoFixed = false;

  // Manejo de suscripciones con Subscription
  private subs: Subscription = new Subscription();

  constructor(private dataService: DataService, public router: Router, private cdr: ChangeDetectorRef) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.logoFixed = this.router.url !== '/home';
      }
    });
  }

  ngAfterViewInit(): void {
    this.subs.add(
      this.dataService.onShowMenu$.subscribe((_showMenu) => {
        this.showMenu = _showMenu;
      })
    );

    this.subs.add(
      this.dataService.onShowLoading$.subscribe((_isLoading) => {
        this.isLoading = _isLoading;
        this.cdr.markForCheck();
      })
    );
  }

  showMenuEvent() {
    this.dataService.onShowMenu.next(true);
  }
  

  ngOnDestroy(): void {
    // Libera todas las suscripciones
    this.subs.unsubscribe();
  }
}
