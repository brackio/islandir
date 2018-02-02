import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatSelectionListChange } from '@angular/material';

import { Country } from '../../models/countries/country';
import { Business } from '../shared/business';
import { CountryService } from '../../models/countries/country.service';
import { BusinessService } from '../shared/business.service';
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
    private businessService: BusinessService
  ) {}

  ngOnInit() {
    const countryCode = this.route.snapshot.paramMap.get('country') || this.countryService.country.code;
    this.getCountry(countryCode);
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.businesses = null;
      this.pageIndex = 0;
      if ((this.searchTerm === undefined) || (this.searchTerm !== params.get('q'))) {
        this.getFilteredServices(params.get('q'), countryCode, this.services, this.amenities, this.territories, this.hasImages);
      }
      this.searchTerm = params.get('q');
      this.services = params.get('services');
      this.territories = params.get('territories');
      this.amenities = params.get('amenities');
      this.hasImages = !!params.get('hasImages');
      this.search(this.searchTerm, countryCode, this.services, this.amenities, this.territories, this.hasImages);
    });
  }

  public dataToShow(business: Business): string {
    if (business.openingHours && (!!business.openingHours.sunday.length
        || !!business.openingHours.monday.length
        || !!business.openingHours.tuesday.length
        || !!business.openingHours.wednesday.length
        || !!business.openingHours.thursday.length
        || !!business.openingHours.friday.length
        || !!business.openingHours.saturday.length
        || !!business.openingHours.sunday.length)) {
      return 'hours';
    } else if (business.address && (!!business.address.street || !!business.address.city)) {
      return 'address';
    } else if (!!business.phone) {
      return 'phone';
    } else if (!!business.description) {
      return 'description';
    }
  }

  public search(query: string,
                country: string,
                services?: string,
                amenities?: string,
                territories?: string,
                hasImages?: boolean): void {
    this.businessService.search(
      this.pageIndex,
      this.pageSize,
      query,
      country,
      services,
      amenities,
      territories,
      hasImages
      ).subscribe((result: any) => {
        if (!!result) {
          this.totalBusinesses = +result.headers.get(CONFIG.vars.xInlineCount);

          if (!this.businesses) {
             this.businesses = result.body as Business[];
          } else {
            this.businesses = this.businesses.concat(result.body  as Business[]);
          }
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

  public businessSelected(business: Business) {
    // TODO: add record to BusinessHits model
    this.router.navigate(['business', business.slug]);
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
