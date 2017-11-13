/**
 * Created by TBaker on 3/8/2017.
 */
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './404/page-not-found.component';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './auth/shared/auth-guard.service';

const routes: Routes = [
  { path: 'business', loadChildren: 'app/businesses/businesses.module#BusinessesModule' },
  { path: 'user', loadChildren: 'app/user/user.module#UserModule' },
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
  { path: '', loadChildren: 'app/home/home.module#HomeModule' },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})

export class AppRoutingModule {}
