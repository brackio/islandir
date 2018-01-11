import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import {
  Router,
  ActivatedRoute,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot } from '@angular/router';

import { Country } from '../../../models/countries/country';
import { CountryService } from '../../../models/countries/country.service';


@Injectable()
export class CountryResolverService implements Resolve<Country> {
  constructor(
    private countryService: CountryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Country> | Country {
    const id = route.paramMap.get('code');
    if (id === 'new') {
      return new Country();
    }

    return this.countryService.findOne(id)
      .pipe(
        map(country => {
          if (country) {
            return country;
          } else { // id not found
            this.router.navigate(['../'], { relativeTo: this.route });
            return null;
          }
        })
      );
  }

}
