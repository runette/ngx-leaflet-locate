# NGX-Leaflet-Locate

This is a wrapper for the [Leaflet.locatecontrol](https://github.com/domoritz/leaflet-locatecontrol) to make it easy to use in Angular 8+.

This wrapper is tested against the [@asymmetrik/ngx-leaflet](https://github.com/Asymmetrik/ngx-leaflet) library but it has no dependency on that library so *should* work without it. It does, obviously, have a dependency that leaflet is loaded.

for an example of this working - see [trackbash](https://trackbash.co.uk).

# Install

Install using npm:

```
npm install leaflet.locatecontrol
npm install @runette/ngx-leaflet-locate
```

# Usage

This library needs to be imported into the application module:

```
import {NgxLeafletLocateModule} from '@runette/ngx-leaflet-locate'

imports: [
    ...
    NgxLeafletLocateModule,
  ],
```

Then, the control is inserted using the following directive:

```
<leaflet-locate-control 
    [map]="..."
    [options]="..."
    (location$)="...($event)"
    ></leaflet-locate-control>
```

Where `map` is an instance of a leaflet map a, `options` is an object with valid options for the control and `location$` is a function to call when there is a new location event.

# Usage with NGX-Leaflet

This library integrates very easily with ngx-leaflet using the onMapReady event:

```
<div id='map' class="map-container" leaflet
     [leafletOptions]="options"
     (leafletMapReady)="onMapReady($event)"
     ></div>
<leaflet-locate-control 
    [map]="map"
    [options]="locateOptions"
    (location$)="onNewLocation($event)"
    ></leaflet-locate-control>
```
by adding the following to your map component (note - the locateOptions are only an example - choose your own options:

```
...
import { Map } from 'leaflet';


export class OsmMapComponent implements OnInit, OnDestroy {
  public map: Map;
  public locateOptions = {
    flyTo: false,
    keepCurrentZoomLevel: true,
    locateOptions: {
                 enableHighAccuracy: true,
               },
    icon: 'material-icons md-18 target icon',
    clickBehavior: {inView: 'stop',
                    outOfView: 'setView',
                    inViewNotFollowing: 'setView'}
  };
  
  ...
  
  onMapReady(map: Map) {
    this.map = map;
  }
  
  onNewLocation(e: Location){
  ...some actions;
}
```

# Usage - Location Events

The module listens for location found events when the control is following the device location.

When there is a location update from the device, that update is emitted as an event to the parent component as `location$ : Location`.

The `Location` type is exported as is defined as :

```
export class Location {
  coords: LatLng; // coordinates in 3 axes of the point (NOTE that the altitude is encoded here as well
  accuracy: number; // accuracy of the point
  speed: number; // speed at this point
  distance: number; // can be used to hold the distance from some datum
  timestamp: number; 

  constructor(coords: LatLng, accuracy?: number) {
    this.coords = coords;
    if (accuracy) {
      this.accuracy=accuracy;
    }
 
```

# Usage - CSS

Unfortunately - I think because the leaflet map is run outside of Angular by ngx-leaflet - the normal css encapsulation does not work and you have to load the css globally.

Add the following to the angular.json 

```
"styles": [
              ...
              "./node_modules/leaflet.locatecontrol/dist/L.Control.Locate.css",
            ],
```

# Build Config

For some reason yet to be found - this library does not like being built with `"buildOptimizer": true,` in the build environment - which is usually the default for the production environment in `angular.json`.

Always build with `"buildOptimizer": false,`.
