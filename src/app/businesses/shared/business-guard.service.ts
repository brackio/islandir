import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { AuthService } from '../../auth/shared/auth.service';
import { UserService } from '../../user/shared/user.service';
import { BusinessService } from './business.service';
import { Business } from './business';

@Injectable()
export class BusinessGuardService implements CanActivate {
  constructor(private authService: AuthService,
              private userService: UserService,
              private businessService: BusinessService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.authService.isAdmin()) {
      return true;
    }

    return this.businessService.getOwner(route.params['slug'])
      .pipe(
        map(business => {
          if (business) {
            if ((business.owner.id === this.userService.currentUser.id)) {
              return true;
            }
          } else { // id not found
            /// TODO: navigate back
            return false;
          }
        })
      );
  }
}
