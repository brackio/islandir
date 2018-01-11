import { Injectable } from '@angular/core';
import { CONFIG } from './config';

@Injectable()
export class GeolocatorService {

  constructor() {
    geolocator.config({
      language: 'en',
      google: {
        version: '3',
        key: CONFIG.google_maps.apiKey
      }
    });
  }

  public staticMapUrl(latitude: number, longitude: number): string {
    const options = {
      center: {
        longitude: longitude,
        latitude: latitude
      },
      mapTypeId: geolocator.MapTypeId.ROADMAP,
      size: '400x200',
      scale: 1,
      zoom: 13,
      marker: '0xE91E63',
      format: geolocator.ImageFormat.PNG
    };

    return geolocator.getStaticMap(options, (err, url) => {
      if (!err) {
        return url;
      }
    });
  }

  public locate(cb: any): {} {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumWait: 10000,
      maximumAge: 0,
      desiredAccuracy: 30,
      fallbackToIP: true,
      addressLookup: true,
      timezone: false,
      staticMap: false
    };

    return geolocator.locate(options, (err, location) => {
      if (err) {
        return cb(err);
      }
      return cb(undefined, location);
    });
  }
}
