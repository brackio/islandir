import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeRedirectComponent } from './home-redirect.component';
import { HomeResolverService } from './home-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: HomeRedirectComponent
  },
  {
    path: ':country',
    component: HomeComponent,
    resolve: {
      country: HomeResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule { }
