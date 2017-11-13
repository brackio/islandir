import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  ActivatedRoute,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { BusinessService } from './business.service';
import { Business } from './business';
import { AlertService } from '../../core/alert.service';

@Injectable()
export class BusinessResolverService implements Resolve<Business> {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private businessService: BusinessService,
    private alertService: AlertService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Business> | Business {
    const slug: string = route.params['slug'];
    return this.businessService.findOneBySug(slug).then(business => {
      if (business) {
        return business;
      } else {
        this.router.navigate(['../'], { relativeTo: this.route });
        this.alertService.error('Could not find business');
        return null;
      }
    });
  }
}
