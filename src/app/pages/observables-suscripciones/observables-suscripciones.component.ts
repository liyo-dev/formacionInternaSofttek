import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subject, Subscription, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../../data.service';
import { PopUpComponent } from '../../components/pop-up/pop-up.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-observables-suscripciones',
  templateUrl: './observables-suscripciones.component.html',
  styleUrls: ['./observables-suscripciones.component.css'],
  standalone: true,
  imports: [PopUpComponent, CommonModule],
})
export class ObservablesSuscripcionesComponent implements OnDestroy {
  data: string | null = null;
  showNotification = false;
  streamData: number | null = null;
  showExampleDetail: string | null = null;
  isLoading: boolean = false;
  showPopUp = false;

  private destroy$ = new Subject<void>();
  private popUpSub: Subscription | undefined;

  @ViewChild(PopUpComponent) popUpComponent!: PopUpComponent;

  constructor(private dataService: DataService) { }

  // Mostrar sección de detalle
  showDetail(example: string) {
    this.showExampleDetail = example;
    this.dataService.onShowExampleDetail.next(false);
  }

  // Regresar a la vista previa
  goBack() {
    this.showExampleDetail = null;
    this.data = null;
    this.showNotification = false;
    this.streamData = null;
    this.destroy$.next();
    this.dataService.onShowExampleDetail.next(true);
  }

  // Ejemplo 1: Cargar datos asíncronos
  loadData() {
    this.dataService.getMockData().subscribe((data) => {
      this.data = data;
      this.dataService.onShowLoading.next(false);
    });
  }

  // Ejemplo 2: Mostrar/Ocultar notificación
  toggleNotification() {
    this.showPopUp = true;
  }

  // Método que se ejecuta cuando el componente PopUp está listo
  onPopupReady() {
    // Asegura que `popUpComponent` esté listo antes de suscribirse
    setTimeout(() => {
      this.popUpSub = this.popUpComponent.onSendNotification$.subscribe(() => {
        this.showNotification = !this.showNotification;
      });
      
    });
  }

  closePopup() {
    this.popUpSub?.unsubscribe();
    this.showNotification = false;
    this.showPopUp = false;
  }

  // Ejemplo 3: Iniciar y detener flujo de datos
  startDataStream() {
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.streamData = value;
      });
  }

  stopDataStream() {
    this.destroy$.next();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.popUpSub?.unsubscribe();
  }
}
