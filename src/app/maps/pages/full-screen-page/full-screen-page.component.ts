import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { Map } from 'mapbox-gl';


@Component({
  selector: 'app-full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})

export class FullScreenPageComponent implements AfterViewInit {


  @ViewChild('map') divMap?: ElementRef; //Referencia al HTML #map

  ngAfterViewInit(): void {

    //Ajuste de seguridad para que no dea un posible error.
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    const map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-7.7167, 43.3333], // starting position [lng, lat] Santaballa
      zoom: 9, // starting zoom
    });
  }


}
