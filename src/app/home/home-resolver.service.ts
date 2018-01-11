import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { Country } from '../models/countries/country';
import { CountryService } from '../models/countries/country.service';

@Injectable()
export class HomeResolverService implements Resolve<Country> {

  constructor(private countryService: CountryService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Country> | Country {
    const countryCode: string = route.paramMap.get('country');

    return this.countryService.findOne(countryCode)
      .pipe(
        map(country => {
          if (country) {
            return country;
          } else { // id not found
            return this.countryService.country;
          }
        })
      );
  }
}

    // return this.countryService.findOne(countryCode).then(country => {
    //   if (country) {
    //     return country;
    //   } else {
    //     const country: Country = this.countryService.country;
    //     return country;
    //   }
    // })

