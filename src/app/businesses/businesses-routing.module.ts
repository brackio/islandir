import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessListComponent } from './business-list/business-list.component';
import { BusinessDetailComponent } from './business-detail/business-detail.component';
import { BusinessEditComponent } from './business-edit/business-edit.component';
import { BusinessResolverService } from './shared/business-resolver.service';
import { BusinessCreateComponent } from './business-create/business-create.component';
import { BusinessInfoEditComponent } from './business-edit/business-info-edit/business-info-edit.component';
import { BusinessPhotosEditComponent } from './business-edit/business-photos-edit/business-photos-edit.component';
import { BusinessReviewsEditComponent } from './business-edit/business-reviews-edit/business-reviews-edit.component';
import { BusinessManageEditComponent } from './business-edit/business-manage-edit/business-manage-edit.component';

import { BusinessGuardService as BusinessGuard } from './shared/business-guard.service';
import { AuthGuardService as AuthGuard } from '../auth/shared/auth-guard.service';
import { BusinessReviewsComponent } from './business-detail/business-reviews/business-reviews.component';
import { BusinessPhotosComponent } from './business-detail/business-photos/business-photos.component';
import { BusinessOverviewComponent } from './business-detail/business-overview/business-overview.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'search', component: BusinessListComponent },
      {
        path: 'new',
        component: BusinessCreateComponent,
        canActivate: [AuthGuard]
      },
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
              { path: 'photos', component: BusinessPhotosEditComponent },
              { path: 'reviews', component: BusinessReviewsEditComponent },
              { path: 'manage', component: BusinessManageEditComponent },
              { path: '', component: BusinessInfoEditComponent }
            ]
          },
          {
            path: '',
            component: BusinessDetailComponent,
            children: [
              { path: 'reviews', component: BusinessReviewsComponent },
              { path: 'photos', component: BusinessPhotosComponent },
              { path: '', component: BusinessOverviewComponent }
            ]
          }
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
