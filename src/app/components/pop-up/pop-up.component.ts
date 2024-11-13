import { Component, EventEmitter, OnDestroy, Output, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnDestroy, AfterViewInit {

  @Output() close = new EventEmitter<void>(); 
  @Output() ready = new EventEmitter<void>(); 

  public onSendNotification = new Subject<void>();
  public onSendNotification$ = this.onSendNotification.asObservable();

  ngAfterViewInit(): void {
    this.ready.emit();
  }

  ngOnDestroy(): void {
    this.onSendNotification.next();
    this.onSendNotification.complete();
  }

  closePopup() {
    this.close.emit();
  }

  sendNotification() { 
    this.onSendNotification.next();
  }
}
