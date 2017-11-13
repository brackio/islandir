import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot } from '@angular/router';

import { Country } from '../../../models/countries/country';
import { CountryService } from '../../../models/countries/country.service';
import { AlertService } from '../../../core/alert.service';

@Injectable()
export class CountryResolverService implements Resolve<Country>{
  constructor(
    private countryService: CountryService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Country> | Country {
    const id = route.paramMap.get('code');
    if ( id === 'new') {
      return new Country();
    }

    return this.countryService.findOne(id)
      .then(country => {
        if (country) {
          return country;
        }
        this.goBack();
        this.alertService.notFound('Country');
        return null;
      }, () => {
        this.goBack();
        return null;
      });
  }

  private goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
