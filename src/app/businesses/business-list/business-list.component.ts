import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Country } from '../../models/countries/country';
import { Business } from '../shared/business';
import { CountryService } from '../../models/countries/country.service';
import { BusinessService } from '../shared/business.service';
import { GlobalErrorHandler as ErrorHandler } from '../../core/global-error-handler';
import { AlertService } from '../../core/alert.service';
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
  public itemsPerPage: number = CONFIG.paging.limit;
  private currentPage: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countryService: CountryService,
    private businessService: BusinessService,
    private errorHandler: ErrorHandler,
    private alertService: AlertService) {
  }

  ngOnInit() {
    let countryCode = this.route.snapshot.paramMap.get('country');
    if (!countryCode) {
      countryCode = this.countryService.country.code;
    }
    this.getCountry(countryCode);
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.searchTerm = params.get('q');
      this.search(this.searchTerm, countryCode);
    });
  }

  public search(query: string, country: string, page?: number): void {
    this.currentPage = page || 1;
    this.businessService.search(query, country, this.currentPage)
      .subscribe(
        (businesses) => this.businesses = businesses,
        err => this.errorHandler.handleError(err));
  }

  public onBusinessSelected(business: Business) {
    // TODO: add record to BusinessHits model
    console.log(business);
    this.router.navigate(['business', business.slug]);
  }

  public onPageChange(page: number) {

  }

  private getCountry(code: string): void {
    this.countryService.findOne(code)
      .then(country => this.country = country);
  }
}
