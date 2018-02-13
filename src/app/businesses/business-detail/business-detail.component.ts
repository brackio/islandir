import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Marker } from '../../models/marker';
import { Business } from '../shared/business';
import { GoogleMapsService } from '../../common/services/google-maps.service';

@Component({
  selector: 'ilr-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent implements OnInit {
  public business: Business;
  public staticMapUrl: string;

  public navLinks = [
    {
      label: 'overview',
      path: '.',
      options: {exact: true}
    },
    {
      label: 'reviews',
      path: 'reviews',
      options: {exact: true}
    },
    {
      label: 'photos',
      path: 'photos',
      options: {exact: true}
    }
  ];

  constructor(
    private googleMapsService: GoogleMapsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.parent.data
      .subscribe((data: { business: Business }) => {
        this.business = data.business;
        if (this.business.latitude && this.business.longitude) {
          this.staticMapUrl = this.googleMapsService.getStaticMap(
            {
              latitude: this.business.latitude,
              longitude: this.business.longitude
            } as Marker,
            260,
            250
          );
        }
    });
  }

  public editBusiness() {
    this.router.navigate(['edit'], { relativeTo: this.route  });
  }

}
