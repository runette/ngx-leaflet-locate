import {LatLng} from 'leaflet';
import { Time } from '@angular/common';

export class Location {
  coords: LatLng; // coordinates in 3 axes of the point
  accuracy: number; // accuracy of the point
  speed: number; // speed at this point
  distance: number; // can be used to hold the distance from some datum
  timestamp: number; 

  constructor(coords: LatLng, accuracy?: number) {
    this.coords = coords;
    if (accuracy) {
      this.accuracy=accuracy;
    }
  }
}

