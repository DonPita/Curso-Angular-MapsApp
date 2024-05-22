import { Component, ElementRef, ViewChild } from '@angular/core';

import { LngLat, Map, Marker } from "mapbox-gl";



interface MarkerAndColor {
  color: string,
  marker: Marker
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {

  public markers: MarkerAndColor[] = [];

  public zoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-7.7167, 43.3333);

  @ViewChild('map') divMap?: ElementRef; //Referencia al HTML #map

  ngAfterViewInit(): void {

    //Ajuste de seguridad para que no dea un posible error.
    if (!this.divMap) {
      throw 'El elemento HTML no fue encontrado';
    }

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat] Santaballa
      zoom: this.zoom, // starting zoom
    });
    // Marcador en la posicion actual central del mapa
    // const marker = new Marker()
    // .setLngLat(this.currentLngLat)
    // .addTo(this.map);
  }

  //Metodo para usar con el addMarker y darle los valores necesarios.
  createMarker() {
    if (!this.map) {
      return;
    }

    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const lngLat = this.map?.getCenter();

    this.addMarker(lngLat, color);
  }

  //Añadir Marcador
  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) {
      return;
    }

    const marker = new Marker({
      color: color,
      draggable: true //Indica que se puede arrastrar el marcador
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({ color, marker });
  }

  //Borrar Marcador
  deleteMarker(index: number) {
    this.markers[index].marker.remove(); //Eliminar del mapa
    this.markers.splice(index, 1); //Eliminar del arreglo
  }
}
