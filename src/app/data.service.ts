import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public onShowExampleDetail = new BehaviorSubject<boolean>(true);
  onShowExampleDetail$ = this.onShowExampleDetail.asObservable();

  public onShowLoading = new BehaviorSubject<boolean>(false);
  onShowLoading$ = this.onShowLoading.asObservable();
  
  constructor() { }

  showExampleDetailSection(status: boolean){
    this.onShowExampleDetail.next(status);
  }

    getMockData(): Observable<string> {
      this.onShowLoading.next(true);
      return of('Datos cargados desde el servidor.').pipe(delay(2000));
    }
}
