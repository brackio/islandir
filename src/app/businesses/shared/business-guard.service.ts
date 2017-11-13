import { Injectable } from '@angular/core';
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
export class BusinessGuardService implements CanActivate{
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private businessService: BusinessService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    if (this.authService.isAdmin()) {
      return true;
    }

    return this.businessService.getOwner(route.params['slug'])
      .then((business: Business) => {
        if (business) {
          if ((business.owner.id === this.userService.currentUser.id)) {
            return true;
          }
        }
        ///TODO: navigate back
        return false;
      });
  }
}
