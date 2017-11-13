/**
 * Created by TBaker on 10/12/2016.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminGuardService as AdminGuard } from './shared/admin-guard.service';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [ AdminGuard ],
    children: [
      { path: 'themes', loadChildren: 'app/admin/themes/themes.module#ThemesModule' },
      { path: 'businesses', loadChildren: 'app/admin/businesses/businesses.module#BusinessesModule' },
      { path: 'countries', loadChildren: 'app/admin/countries/countries.module#CountriesModule' },
      { path: 'categories', loadChildren: 'app/admin/categories/categories.module#CategoriesModule' },
      { path: 'services', loadChildren: 'app/admin/services/services.module#ServicesModule' },
      { path: 'keywords', loadChildren: 'app/admin/keywords/keywords.module#KeywordsModule' },
      {
        path: '', component: DashboardComponent
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AdminGuard
  ]
})
export class AdminRoutingModule {}
