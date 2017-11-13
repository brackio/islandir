import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot } from '@angular/router';

import { Service } from '../../../models/services/service';
import { ServiceService } from '../../../models/services/service.service';
import { AlertService } from '../../../core/alert.service';

@Injectable()
export class ServiceResolverService implements Resolve<Service>{
  constructor(
    private serviceService: ServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Service> | Service {
    const id = route.paramMap.get('id');
    if ( id === 'new') {
      return new Service();
    }

    return this.serviceService.findOne(id)
      .then(service => {
        if (service) {
          return service;
        }
        this.goBack();
        this.alertService.notFound('Service');
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
