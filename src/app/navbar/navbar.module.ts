import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { SearchModule } from '../search/search.module';

import { NavbarHomeComponent } from './navbar-home/navbar-home.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { NotificationService } from '../notifications/shared/notification.service';
import { NavbarBusinessComponent } from './navbar-business/navbar-business.component';

@NgModule({
  imports: [
    FormsModule,
    RouterModule,
    SharedModule,
    SearchModule
  ],
  declarations: [
    NavbarHomeComponent,
    NavbarAdminComponent,
    UserNavComponent,
    NavbarBusinessComponent
  ],
  exports: [
    NavbarHomeComponent,
    NavbarAdminComponent,
    NavbarBusinessComponent
  ],
  providers: [
    NotificationService
  ]
})
export class NavbarModule { }
