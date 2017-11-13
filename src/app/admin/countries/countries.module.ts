import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { DialogsModule } from '../../dialogs/dialogs.module';

import { CountriesRoutingModule } from './countries-routing.module';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryEditComponent } from './country-edit/country-edit.component';
import { CountryResolverService } from './shared/country-resolver.service';

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    DialogsModule,
    SharedModule,
    CountriesRoutingModule
  ],
  declarations: [
    CountryListComponent,
    CountryEditComponent
  ],
  providers: [
    CountryResolverService
  ]
})
export class CountriesModule { }
