import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CanDeactivateGuard } from '../../core/can-deactivate-guard.service';
import { CategoryResolverService } from './shared/category-resolver.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':id',
        component: CategoryEditComponent,
        canDeactivate: [ CanDeactivateGuard ],
        resolve: {
          category: CategoryResolverService
        },
      },
      { path: '', component: CategoryListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
