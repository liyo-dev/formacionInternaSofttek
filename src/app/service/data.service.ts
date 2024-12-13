import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public onShowMenu = new BehaviorSubject<boolean>(true);
  onShowMenu$ = this.onShowMenu.asObservable();

  public onShowLoading = new BehaviorSubject<boolean>(false);
  onShowLoading$ = this.onShowLoading.asObservable();

  constructor() {}

  getMockData(): Observable<string> {
    this.onShowLoading.next(true);
    return of('Datos cargados desde el servidor.').pipe(delay(2000));
  }
}
