import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CovalentDialogsModule } from '@covalent/core/dialogs';

import { SharedModule } from '../../shared/shared.module';
import { ServicesRoutingModule } from './services-routing.module';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';

import { ServiceService } from '../../models/services/service.service';
import { ServiceResolverService } from './shared/service-resolver.service';
import { CategoryService } from '../../models/categories/category.service';

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    CovalentDialogsModule,
    ServicesRoutingModule
  ],
  declarations: [
    ServiceListComponent,
    ServiceEditComponent
  ],
  providers: [
    CategoryService,
    ServiceService,
    ServiceResolverService
  ]
})
export class ServicesModule { }
