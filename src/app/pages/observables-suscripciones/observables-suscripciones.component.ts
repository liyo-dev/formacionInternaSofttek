import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subject, Subscription, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../../data.service';
import { PopUpComponent } from '../../components/pop-up/pop-up.component';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-observables-suscripciones',
  templateUrl: './observables-suscripciones.component.html',
  styleUrls: ['./observables-suscripciones.component.css'],
  standalone: true,
  imports: [PopUpComponent],
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

  constructor(private dataService: DataService) {}  
  
  
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
   
    //dejo esto fuera para que falle
    // this.popUpSub = this.popUpComponent.onSendNotification$.subscribe(() => {
    //   this.showNotification = !this.showNotification;
    // });

    //posible solucion dentro de un delay
    // inconveniente que hay que añadirle un tiempo
    setTimeout(() => {

    }, 100);

    //mandar un output desde el componente para saber cuando se ha instanciado
  }

  onPopupReady() {
    //aunque debemos añadir el delay para esperar a que se termine de instanciar
    //no hay que añadir tiempo
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
