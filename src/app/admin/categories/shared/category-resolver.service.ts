import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { AlertService } from '../../../core/alert.service';
import { Category } from '../../../models/categories/category';
import { CategoryService } from '../../../models/categories/category.service';

@Injectable()
export class CategoryResolverService implements Resolve<Category> {
  constructor(
    private service: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Category> | Category {
    const id = route.paramMap.get('id');
    if ( id === 'new') {
      return new Category();
    }

     return this.service.findOne(id)
        .then(
        category => {
          {
            if (category) {
              return category;
            }
            this.goBack();
            this.alertService.notFound('Category');
          }
        },
        () => {
          this.goBack();
          return null;
        });
  }

  private goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
