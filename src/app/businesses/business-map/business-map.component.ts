import { Component, OnInit, Input } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

import { Business } from '../shared/business';

@Component({
  selector: 'ilr-business-map',
  templateUrl: './business-map.component.html',
  styleUrls: ['./business-map.component.scss']
})
export class BusinessMapComponent implements OnInit {
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() businesses: Business[];
  public latlngBounds: any;

  constructor(private mapsAPILoader: MapsAPILoader) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      let applyLatLon: boolean = false;
      this.businesses.forEach((business) => {
        if (business.latitude && business.longitude) {
          if (!applyLatLon) {
            this.latlngBounds = new google.maps.LatLngBounds();
            applyLatLon = true;
          }
          this.latlngBounds.extend(new google.maps.LatLng(business.latitude, business.longitude));
        }
      });
    });
  }

}
