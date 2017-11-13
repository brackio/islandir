import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../../auth/shared/auth.service';

@Injectable()
export class AdminGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAdmin();
  }

}
