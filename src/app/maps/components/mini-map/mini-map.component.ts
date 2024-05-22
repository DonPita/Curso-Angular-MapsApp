import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { LngLat, Map, Marker } from 'mapbox-gl'

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})

export class MiniMapComponent implements AfterViewInit {

  public map?: Map;

  @ViewChild('map') divMap?: ElementRef;

  @Input()
  lngLat?: [number, number];


  ngAfterViewInit(): void {
    if (!this.divMap?.nativeElement) {
      throw 'Map Div not found';
    }

    if (!this.lngLat) {
      throw 'LngLat cant be null';
    }

    //Mapa
    this.map = new Map({
      container: this.divMap?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: 15,
    });

    this.createMarker();

  }
  //Marker
  createMarker() {
    if (!this.map) {
      return;
    }

    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const lngLat = this.lngLat;
    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: [number, number] | undefined, color: string) {
    if (!this.map) {
      return;
    }

    const marker = new Marker({
      color: color,
    })
      .setLngLat(lngLat!)
      .addTo(this.map);
  }

}
