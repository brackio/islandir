import { Injectable, NgZone } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { CONFIG } from '../../core/config';

import { Marker } from '../../models/marker';

@Injectable()
export class GoogleMapsService extends GoogleMapsAPIWrapper {
  constructor(private __loader: MapsAPILoader, private __zone: NgZone) {
    super(__loader, __zone);
  }

  public getLatLan(address: string): void {
    console.log('Getting Address - ', address);
    const geocoder = new google.maps.Geocoder();
    return Observable.create(observer => {
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          observer.next(results[0].geometry.location);
          observer.complete();
        } else {
          console.log('Error - ', results, ' & Status - ', status);
          observer.next({});
          observer.complete();
        }
      });
    });
  }

  public getStaticMap(marker: Marker, height: number, width?: number): string {
    return `https://maps.googleapis.com/maps/api/staticmap?center=&zoom=13&scale=false&size=${width}x${height}&maptype=roadmap&key=${CONFIG.google_maps.apiKey}&format=jpg&visual_refresh=true&markers=size:mid%7Ccolor:0xFF4081%7Clabel:%7C${marker.latitude},${marker.longitude}`;
  }
}
