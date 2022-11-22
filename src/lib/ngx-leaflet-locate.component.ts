/// <reference path="../../node_modules/@types/leaflet.locatecontrol/index.d.ts" />
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {Map, control, Control, LocationEvent} from 'leaflet';
import '../../../../node_modules/leaflet.locatecontrol/dist/L.Control.Locate.min.js';

@Component({
  selector: 'leaflet-locate-control',
  template: '',
  styleUrls: []
})
export class NgxLeafletLocateComponent implements OnInit, OnDestroy {
  private _map?: Map;
  @Output() location$: EventEmitter<LocationEvent> = new EventEmitter;
  public control: Control.Locate = new Control.Locate();

  constructor() { 
  };

  ngOnInit() {
  };

  ngOnDestroy() {
    if (this.control && this.map) {
      this.control.stop();
      this._map.off("unload", this.control._unload, this.control);
    }
    if (this._map && this.control) this._map.removeControl(this.control);
    this._map?.off('locationfound')
  };

  @Input() options: Control.LocateOptions= {};

  @Input() set map(map: Map | undefined){
    if (map) {
      this._map = map;
      this.control =  control.locate(this.options);
      this.control.addTo(map);
      let location$ = this.location$;
      map.on('locationfound', e => {
        location$.emit(e);
      });
    }
  }
  get map(): Map | undefined {
    return this._map
  }

}
