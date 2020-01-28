# NGX-Leaflet-Locate

>
>WARNING - Breaking Changes in Version 2. See below for details
>

This is a wrapper for the [Leaflet.locatecontrol](https://github.com/domoritz/leaflet-locatecontrol) to make it easy to use in Angular 8+.

This wrapper is tested against the [@asymmetrik/ngx-leaflet](https://github.com/Asymmetrik/ngx-leaflet) library but it has no dependency on that library so *should* work without it. It does, obviously, have a dependency that leaflet is loaded.

For more detailed descriptions of how this wrapper was created : [Documentation](https://runette.gitbook.io/alcm/).

For detailed descriptions of how to use and worked examples : [Article](https://medium.com/runic-software/quick-guide-to-leaflet-controls-in-angular-io-1b35d0807bdb), [Article](https://medium.com/runic-software/advanced-interactive-maps-in-angular-with-leaflet-68baafa03f72)

For an example of this working in a real site - see [trackbash](https://trackbash.co.uk).

# Install

Install using npm:

```
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

>
>BREAKING CHANGES - from V2.0.0 the module emits native [`LocationEvent`](https://leafletjs.com/reference-1.6.0.html#locationevent) events.
>The previous `Location` type no longer exists. `LocationEvent` type is defined on the leaflet module.
>
> This is to provide consistency and avoid data loss. The most major change is that the old `coords` property is no `latlng`
>

The module listens for location found events when the control is following the device location.

When there is a location update from the device, that update is emitted as an event to the parent component as `location$ : LocationEvent`.

# Usage - CSS

Unfortunately - I think because the leaflet map is run outside of Angular by ngx-leaflet - the normal css encapsulation does not work and you have to load the css globally.

Add the following to the styles.css 

```CSS
@import "leaflet.locatecontrol/dist/L.Control.Locate.css";
```

# Build Config

For some reason yet to be found - this library does not like being built with `"buildOptimizer": true,` in the build environment - which is usually the default for the production environment in `angular.json`.

Always build with `"buildOptimizer": false,`.

# API Access to the Control

If you want access the control's methods directly from your typescript code - this can be done with `@ViewChild`

Use `ViewChild` to access the component, for instance 

```ts
@ViewChild(NgxLeafletLocateComponent,{static: false}) locateComponent: NgxLeafletLocateComponent;
```

The actual instance of the control can then be accessed directly as `this.locateComponent.control`

For more details and worked examples, see : [Article](https://medium.com/runic-software/advanced-interactive-maps-in-angular-with-leaflet-68baafa03f72)
