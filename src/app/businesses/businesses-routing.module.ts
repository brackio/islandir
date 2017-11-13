import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessListComponent } from './business-list/business-list.component';
import { BusinessDetailComponent } from './business-detail/business-detail.component';
import { BusinessEditComponent } from './business-edit/business-edit.component';
import { BusinessInfoComponent } from './business-edit/business-info/business-info.component';
import { BusinessPhotosComponent } from './business-edit/business-photos/business-photos.component';
import { BusinessReviewComponent } from './business-edit/business-review/business-review.component';
import { BusinessResolverService } from './shared/business-resolver.service';

import { BusinessGuardService as BusinessGuard } from './shared/business-guard.service';
import { AuthGuardService as AuthGuard } from '../auth/shared/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'search', component: BusinessListComponent },
      {
        path: ':slug',
        resolve: {
          business: BusinessResolverService
        },
        children: [
          {
            path: 'edit',
            component: BusinessEditComponent,
            canActivate: [ AuthGuard, BusinessGuard ],
            children: [
              { path: 'photos', component: BusinessPhotosComponent },
              { path: 'reviews', component: BusinessReviewComponent },
              { path: '', component: BusinessInfoComponent }
            ]
          },
          { path: '', component: BusinessDetailComponent }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [BusinessGuard]
})
export class BusinessesRoutingModule { }
