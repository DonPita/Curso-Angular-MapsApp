import { AfterViewInit, Component } from '@angular/core';

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZG9ucGl0YSIsImEiOiJjbHdnaGF4YzMwMDcyMmlvNzJxdzRwbXZzIn0.LPuDDQwTtu_l68KZ0T_v4g';

@Component({
  selector: 'app-full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})

export class FullScreenPageComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-7.7167, 43.3333], // starting position [lng, lat] Santaballa
    zoom: 9, // starting zoom
  });
  }


}
