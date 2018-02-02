import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { AvatarModule } from 'ngx-avatar';

import { SharedModule } from '../shared/shared.module';
import { SearchModule } from '../search/search.module';

import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { NotificationService } from '../notifications/shared/notification.service';
import { NavbarBaseComponent } from './navbar-base/navbar-base.component';
import { NavbarSearchComponent } from './navbar-search/navbar-search.component';

@NgModule({
  imports: [
    FormsModule,
    AvatarModule,
    RouterModule,
    SharedModule,
    SearchModule
  ],
  declarations: [
    NavbarAdminComponent,
    UserNavComponent,
    NavbarBaseComponent,
    NavbarSearchComponent
  ],
  exports: [
    NavbarAdminComponent,
    NavbarBaseComponent,
    NavbarSearchComponent,
    UserNavComponent
  ],
  providers: [
    NotificationService
  ]
})
export class NavbarModule { }
