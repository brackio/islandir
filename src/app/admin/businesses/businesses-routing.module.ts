import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessListComponent } from './business-list/business-list.component';
import { BusinessEditComponent } from './business-edit/business-edit.component';
import { CanDeactivateGuard } from '../../core/can-deactivate-guard.service';
import { BusinessResolverService } from '../../businesses/shared/business-resolver.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':slug',
        component: BusinessEditComponent,
        canDeactivate: [ CanDeactivateGuard ],
        resolve: {
          category: BusinessResolverService
        },
      },
      { path: '', component: BusinessListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessesRoutingModule { }
