import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Business } from '../shared/business';
import { GeolocatorService } from '../../core/geolocator.service';

@Component({
  selector: 'ilr-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent implements OnInit {
  public business: Business;
  public staticMapUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public geolocatorService: GeolocatorService
  ) { }

  ngOnInit() {
    this.route.parent.data
      .subscribe((data: { business: Business }) => {
        this.business = data.business;
        if (this.business.latitude && this.business.longitude) {
          this.staticMapUrl = this.geolocatorService.staticMapUrl(this.business.latitude, this.business.longitude);
        }
      });
  }

  public editBusiness() {
    this.router.navigate(['edit'], { relativeTo: this.route  });
  }

}
