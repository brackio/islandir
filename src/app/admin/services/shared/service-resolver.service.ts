import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import {
  Router,
  ActivatedRoute,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot } from '@angular/router';

import { Service } from '../../../models/services/service';
import { ServiceService } from '../../../models/services/service.service';

@Injectable()
export class ServiceResolverService implements Resolve<Service>{
  constructor(
    private serviceService: ServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Service> | Service {
    const id = route.paramMap.get('id');
    if ( id === 'new') {
      return new Service();
    }

    return this.serviceService.findOne(id)
      .pipe(
        map(service => {
          if (service) {
            return service;
          } else { // id not found
            this.router.navigate(['../'], { relativeTo: this.route });
            return null;
          }
        })
      );
  }
}
