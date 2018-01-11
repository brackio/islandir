import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import {
  Router,
  ActivatedRoute,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { Category } from '../../../models/categories/category';
import { CategoryService } from '../../../models/categories/category.service';

@Injectable()
export class CategoryResolverService implements Resolve<Category> {
  constructor(
    private service: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category> | Category {
    const id = route.paramMap.get('id');
    if ( id === 'new') {
      return new Category();
    }

     return this.service.findOne(id)
       .pipe(
         map(category => {
           if (category) {
             return category;
           } else { // id not found
             this.router.navigate(['../'], { relativeTo: this.route });
             return null;
           }
         })
       );
  }
}
