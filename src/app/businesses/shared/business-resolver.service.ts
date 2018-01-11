import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import {
  Router,
  Resolve,
  ActivatedRoute,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { BusinessService } from './business.service';
import { Business } from './business';

@Injectable()
export class BusinessResolverService implements Resolve<Business> {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private businessService: BusinessService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Business> | Business {
    const slug: string = route.paramMap.get('slug');

    return this.businessService.findOneBySug(slug)
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
