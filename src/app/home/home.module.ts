import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { SearchModule } from '../search/search.module';
import { MessageModule } from '../message/message.module';
import { NavbarModule } from '../navbar/navbar.module';

import { HomeComponent } from './home.component';
import { HomeRedirectComponent } from './home-redirect.component';
import { ThemeService } from '../models/themes/theme.service';
import { HomeResolverService } from './home-resolver.service';

@NgModule({
  imports: [
    SharedModule,
    SearchModule,
    MessageModule,
    NavbarModule,
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
