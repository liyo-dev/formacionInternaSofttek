import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ObservablesSuscripcionesComponent } from './pages/observables-suscripciones/observables-suscripciones.component';
import { CiclosDeVidaWrapperComponent } from './components/ciclos-de-vida-wrapper/ciclos-de-vida-wrapper.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },  
    { path: 'home', component: HomeComponent }, 
    { path: 'observables-suscripciones', component: ObservablesSuscripcionesComponent },  
    { path: 'ciclos-vida', component: CiclosDeVidaWrapperComponent },
  ];
