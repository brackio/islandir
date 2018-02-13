import { NgModule } from '@angular/core';
import { CovalentMessageModule } from '@covalent/core/message';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { SearchModule } from '../search/search.module';
import { NavbarModule } from '../navbar/navbar.module';

import { HomeComponent } from './home.component';
import { HomeRedirectComponent } from './home-redirect.component';

import { CategoryService } from '../models/categories/category.service';
import { HomeResolverService } from './home-resolver.service';
import { GeolocatorService } from '../common/services/geolocator.service';
import { ThemeService } from '../models/themes/theme.service';

@NgModule({
  imports: [
    SharedModule,
    SearchModule,
    CovalentMessageModule,
    NavbarModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    HomeRedirectComponent
  ],
  providers: [
    CategoryService,
    HomeResolverService,
    GeolocatorService,
    ThemeService
  ]
})
export class HomeModule { }
