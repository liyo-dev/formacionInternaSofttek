import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  AfterViewInit,
  AfterContentInit,
  AfterContentChecked,
  DoCheck,
  ViewChild,
  ContentChild,
  ElementRef,
  Input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-ciclos-de-vida',
  templateUrl: './ciclos-de-vida.page.html',
  styleUrls: ['./ciclos-de-vida.page.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CiclosDeVidaPage
  implements OnInit, OnChanges, OnDestroy, AfterViewInit, AfterContentInit, AfterContentChecked, DoCheck {
  showExampleDetail: string | null = null;

  @Input() inputValue: string = '';
  lastChange: string = '';
  viewInitialized: string = '';
  manualCheck: string = '';
  contentInitialized: string = '';
  @ViewChild('exampleElement', { static: false }) exampleElement!: ElementRef;
  @ContentChild('projectedContent', { static: false }) projectedContent!: ElementRef;

  constructor(private dataService: DataService, private route: Router) {}

  showDetail(example: string) {
    this.showExampleDetail = example;
  }

  goBack() {
    this.showExampleDetail = null;
  }

  ngOnInit(): void {
    console.log('ngOnInit ejecutado');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputValue']) {
      this.lastChange = `Valor cambiado a: ${changes['inputValue'].currentValue}`;
    }
    console.log('ngOnChanges ejecutado', changes);
  }

  ngDoCheck(): void {
    if (this.manualCheck !== this.inputValue) {
      this.manualCheck = this.inputValue;
      console.log('ngDoCheck detectó un cambio');
    }
  }

  ngAfterContentInit(): void {
    this.contentInitialized =
      this.projectedContent?.nativeElement?.innerText || 'Contenido proyectado inicializado';
    console.log('ngAfterContentInit ejecutado');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked ejecutado');
  }

  ngAfterViewInit(): void {
    this.viewInitialized =
      this.exampleElement?.nativeElement?.innerText || 'Elemento de vista inicializado';
    console.log('ngAfterViewInit ejecutado');
  }

  navigateHome(){
    this.route.navigate(['/home']);
    this.dataService.onShowMenu.next(true);
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy ejecutado');
  }
}
