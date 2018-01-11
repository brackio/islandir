import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import {
  Router,
  ActivatedRoute,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot } from '@angular/router';

import { Keyword } from '../../../models/keywords/keyword';
import { KeywordService } from '../../../models/keywords/keyword.service';


@Injectable()
export class KeywordResolverService implements Resolve<Keyword> {
  constructor(
    private keywordService: KeywordService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Keyword> | Keyword {
    const id = route.paramMap.get('id');
    if ( id === 'new') {
      return new Keyword();
    }

    return this.keywordService.findOne(id)
      .pipe(
        map(keyword => {
          if (keyword) {
            return keyword;
          } else { // id not found
            this.router.navigate(['../'], { relativeTo: this.route });
            return null;
          }
        })
      );
  }

}
