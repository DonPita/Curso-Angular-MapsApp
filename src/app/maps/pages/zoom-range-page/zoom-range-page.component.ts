import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { Map } from "mapbox-gl";

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})

export class ZoomRangePageComponent implements AfterViewInit {

  public zoom: number = 10;
  public map?: Map;

  @ViewChild('map') divMap?: ElementRef; //Referencia al HTML #map

  ngAfterViewInit(): void {

    //Ajuste de seguridad para que no dea un posible error.
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-7.7167, 43.3333], // starting position [lng, lat] Santaballa
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
  }

  //Unir el zoom al HTML
  mapListeners() {
    if (!this.map) throw 'Mapa no inicializado';

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    //Esto es para que vuelva siempre al zoom 18 si te pasas de rosca.
    this.map.on('zoomend', (ev) => {
      if (this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
      this.zoom = this.map!.getZoom();
    });
  }

  //Botones

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  //Barra de zoom
  zoomChanged(value: string) {
    this.zoom = Number(value); //Transformar el string a number
    this.map?.zoomTo(this.zoom); //Se manda al mapa el zoom recibido al mover la barrita.
  }

}

