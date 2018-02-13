import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CovalentDialogsModule } from '@covalent/core/dialogs';
import { SharedModule } from '../../shared/shared.module';

import { CountriesRoutingModule } from './countries-routing.module';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryEditComponent } from './country-edit/country-edit.component';
import { CountryResolverService } from './shared/country-resolver.service';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CovalentDialogsModule,
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
