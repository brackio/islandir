import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot } from '@angular/router';

import { Keyword } from '../../../models/keywords/keyword';
import { KeywordService } from '../../../models/keywords/keyword.service';
import { AlertService } from '../../../core/alert.service';

@Injectable()
export class KeywordResolverService implements Resolve<Keyword> {
  constructor(
    private keywordService: KeywordService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Keyword> | Keyword {
    const id = route.paramMap.get('id');
    if ( id === 'new') {
      return new Keyword();
    }

    return this.keywordService.findOne(id)
      .then(keyword => {
        if (keyword) {
          return keyword;
        }
        this.goBack();
        this.alertService.notFound('Keyword');
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
