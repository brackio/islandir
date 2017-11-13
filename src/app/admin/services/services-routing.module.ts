import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';
import { CanDeactivateGuard } from '../../core/can-deactivate-guard.service';
import { ServiceResolverService } from './shared/service-resolver.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':id',
        component: ServiceEditComponent,
        canDeactivate: [ CanDeactivateGuard ],
        resolve: {
          service: ServiceResolverService
        }
      },
      { path: '', component: ServiceListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
