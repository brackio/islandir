import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountryListComponent } from './country-list/country-list.component';
import { CountryEditComponent } from './country-edit/country-edit.component';
import { CanDeactivateGuard } from '../../core/can-deactivate-guard.service';
import { CountryResolverService } from './shared/country-resolver.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':code',
        component: CountryEditComponent,
        canDeactivate: [ CanDeactivateGuard ],
        resolve: {
          country: CountryResolverService
        }
      },
      { path: '', component: CountryListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }
