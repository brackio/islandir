import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { SearchModule } from '../search/search.module';
import { MessageModule } from '../message/message.module';
import { AccountLoginModule } from '../account-login/account-login.module';

import { HomeComponent } from './home.component';
import { HomeRedirectComponent } from './home-redirect.component';
import { ThemeService } from '../models/themes/theme.service';
import { HomeResolverService } from './home-resolver.service';

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    SearchModule,
    MessageModule,
    AccountLoginModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    HomeRedirectComponent
  ],
  providers: [
    ThemeService,
    HomeResolverService
  ]
})
export class HomeModule { }
