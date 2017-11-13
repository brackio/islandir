/**
 * Created by TBaker on 10/12/2016.
 */
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { NavbarModule } from '../navbar/navbar.module';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { SidenavService } from './shared/sidenav.service';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    NavbarModule
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
  ],
  providers: [
    SidenavService
  ]
})
export class AdminModule {}
