import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import {
  Router,
  ActivatedRoute,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot } from '@angular/router';

import { Theme } from '../../../models/themes/theme';
import { ThemeService } from '../../../models/themes/theme.service';

@Injectable()
export class ThemeResolverService implements Resolve<Theme> {
  constructor(
    private themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Theme> | Theme {
    const id = route.paramMap.get('id');
    if ( id === 'new') {
      return new Theme();
    }

    return this.themeService.findOne(id)
      .pipe(
        map(theme => {
          if (theme) {
            return theme;
          } else { // id not found
            this.router.navigate(['../'], { relativeTo: this.route });
            return null;
          }
        })
      );
  }
}
