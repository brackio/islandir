import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Business } from '../../shared/business';
import { GeolocatorService } from '../../../common/services/geolocator.service';

@Component({
  selector: 'ilr-business-overview',
  templateUrl: './business-overview.component.html',
  styleUrls: ['./business-overview.component.scss']
})
export class BusinessOverviewComponent implements OnInit {
  public business: Business;
  public staticMapUrl: string;

  constructor(
    private geolocatorService: GeolocatorService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.parent.data
      .subscribe((data: { business: Business }) => {
        this.business = data.business;
        this.getMapUrl(data.business);
      });
  }

  private getMapUrl(business: Business): void {
    if (business.longitude && business.latitude) {
      this.staticMapUrl = this.geolocatorService.staticMapUrl(business.latitude, business.longitude);
    }
  }

}
