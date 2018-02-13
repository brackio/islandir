import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatSelectionListChange } from '@angular/material';

import { Country } from '../../models/countries/country';
import { Business } from '../shared/business';
import { User } from '../../user/shared/user';
import { CountryService } from '../../models/countries/country.service';
import { BusinessService } from '../shared/business.service';
import { UserService } from '../../user/shared/user.service';
import { GeolocatorService } from '../../common/services/geolocator.service';
import { CacheManagerService } from '../../common/services/cache-manager.service';
import { CONFIG } from '../../core/config';

@Component({
  selector: 'ilr-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.scss'],
})

export class BusinessListComponent implements OnInit {
  public businesses: Business[];
  public country: Country;
  public searchTerm: string;
  public latitude: number;
  public longitude: number;
  public totalBusinesses: number = 0;
  public pageIndex: number = 0;
  public pageSize: number = CONFIG.paging.limit;
  public pageLimitOptions = CONFIG.paging.limitOptions;

  public selectedServices = [];

  // filters
  public filteredServices = [];

  // filter toggles
  public showServices: boolean = true;

  // search criteria
  private services: string;
  private amenities: string;
  private territories: string;
  private hasImages: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countryService: CountryService,
    private businessService: BusinessService,
    private userService: UserService,
    private geolocator: GeolocatorService,
    private cache: CacheManagerService
  ) {}

  ngOnInit() {
    const countryCode = this.route.snapshot.paramMap.get('country') || this.countryService.country.code;
    this.getCountry(countryCode);

    const user: User = this.userService.currentUser;
    if (user) {
      this.setLatLong(user.location.latitude, user.location.longitude);
    } else {
      const location = JSON.parse(this.cache.get(CONFIG.vars.clientLocation));
      if (!!location) {
        this.setLatLong(location.coords.latitude, location.coords.longitude);
      } else {
        this.geolocator.locate((err, loc) => {
          if (!!loc) {
            this.setLatLong(loc.coords.latitude, loc.coords.longitude);
          }
        });
      }
    }

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.businesses = null;
      this.pageIndex = 0;
      // if ((this.searchTerm === undefined) || (this.searchTerm !== params.get('q'))) {
        // this.getFilteredServices(params.get('q'), countryCode, this.services, this.amenities, this.territories, this.hasImages);
      // }
      this.searchTerm = params.get('q');
      this.services = params.get('services');
      this.territories = params.get('territories');
      this.amenities = params.get('amenities');
      this.hasImages = !!params.get('hasImages');
      this.search(this.searchTerm, countryCode, this.services, this.amenities, this.territories, this.hasImages);
    });
  }

  public setLatLong(lat: number, lon: number) {
    this.latitude = lat;
    this.longitude = lon;
  }

  public search(query: string,
                country: string,
                services?: string,
                amenities?: string,
                territories?: string,
                hasImages?: boolean): void {

    const fields = [
      'name',
      'slug',
      'services',
      'photos',
      'address',
      'phone',
      'email',
      'latitude',
      'longitude',
      'openingHours',
      'description',
      'reviews.score'
    ];

    this.businessService.search(
      this.pageIndex,
      this.pageSize,
      query,
      country,
      fields,
      services,
      amenities,
      territories,
      hasImages).subscribe((result: any) => {
        if (result && !!result.body.length) {
          this.totalBusinesses = +result.headers.get(CONFIG.vars.xInlineCount);

          if (!this.businesses) {
            this.businesses = result.body as Business[];
          } else {
            this.businesses = this.businesses.concat(result.body  as Business[]);
          }
        } else {
          this.businesses = [];
        }
      });
  }

  public filter(event: MatSelectionListChange): void {
    const service = event.option.value;
    if (event.option.selected) {
      this.selectedServices.push(service);
    } else {
      const i = this.selectedServices.indexOf(service);

      if (this.selectedServices.indexOf(service) > -1) {
        this.selectedServices.splice(i, 1);
      }
    }

    this.router.navigate(
      ['/business/search',
        {
          q: this.searchTerm,
          country: this.country.code,
          services: `${this.selectedServices.join(',')}`
        }]);
  }

  public onScroll(): void {
    if (this.businesses && this.businesses.length !== this.totalBusinesses) {
      this.pageIndex += 1;
      this.search(this.searchTerm, this.country.code, this.services, this.amenities, this.territories, this.hasImages);
    }
  }

  private getFilteredServices(query: string,
                         country: string,
                         services?: string,
                         amenities?: string,
                         territories?: string,
                         hasImages?: boolean): void {
    this.businessService.filteredServices(
      query,
      country,
      services,
      amenities,
      territories,
      hasImages).subscribe(results => {
        this.filteredServices = results;
    });
  }

  private getCountry(code: string): void {
    this.countryService.findOne(code)
      .subscribe(country => this.country = country);
  }
}
