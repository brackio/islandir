import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogsModule } from '../../dialogs/dialogs.module';

import { SharedModule } from '../../shared/shared.module';
import { ServicesRoutingModule } from './services-routing.module';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';

import { ServiceResolverService } from './shared/service-resolver.service';

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    DialogsModule,
    ServicesRoutingModule
  ],
  declarations: [
    ServiceListComponent,
    ServiceEditComponent
  ],
  providers: [
    ServiceResolverService
  ]
})
export class ServicesModule { }
