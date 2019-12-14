import { Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {Map, control, Control, latLng } from 'leaflet';
import * as L from 'leaflet';
import {Location} from './Location';
import '../../../../node_modules/leaflet.locatecontrol/dist/L.Control.Locate.min.js';

declare module 'leaflet' {
  namespace control {
      function locate(v: any): Control;
    }
}

@Component({
  selector: 'leaflet-locate-control',
  template: '',
  styleUrls: []
})
export class NgxLeafletLocateComponent implements OnInit, OnDestroy {
  private _map: Map;
  @Output() location$: EventEmitter<Location> = new EventEmitter;
  private control: Control;

  constructor() { 
  };

  ngOnInit() {
  };

  ngOnDestroy() {
    this.map.removeControl(this.control);
    this.map.off('locationfound')
  };

  @Input() options: {[name:string]:any} = {};

  @Input() set map(map: Map){
    if (map) {
      this._map = map;
      this.control = control.locate(this.options);
      this.control.addTo(map);
      let location$ = this.location$;
      map.on('locationfound', function(e) {
        const newLocation = new Location(latLng(e.latlng.lat, e.latlng.lng, Math.round(e.altitude || 0)),e.accuracy || 0);
        newLocation.speed = e.speed || 0;
        newLocation.timestamp = Date.now();
        location$.emit(newLocation);
      });
    }
  }
  get map(): Map {
    return this._map
  }

}
