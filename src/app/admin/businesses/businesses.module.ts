import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { DialogsModule } from '../../dialogs/dialogs.module';

import { BusinessesRoutingModule } from './businesses-routing.module';
import { BusinessListComponent } from './business-list/business-list.component';
import { BusinessEditComponent } from './business-edit/business-edit.component';

import { BusinessService } from '../../businesses/shared/business.service';
import { BusinessResolverService } from '../../businesses/shared/business-resolver.service';

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    DialogsModule,
    BusinessesRoutingModule
  ],
  declarations: [
    BusinessListComponent,
    BusinessEditComponent
  ],
  providers: [
    BusinessService,
    BusinessResolverService
  ]
})
export class BusinessesModule { }
