import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CustomFormsModule } from 'ng2-validation';
// import { CloudinaryModule } from '@cloudinary/angular-4.x';
// import * as  Cloudinary from 'cloudinary-core';
import { SharedModule } from '../shared/shared.module';
import { NavbarModule } from '../navbar/navbar.module';
import { AgmCoreModule } from '@agm/core';

import { BusinessesRoutingModule } from './businesses-routing.module';
import { BusinessListComponent } from './business-list/business-list.component';
import { BusinessDetailComponent } from './business-detail/business-detail.component';
import { BusinessEditComponent } from './business-edit/business-edit.component';
import { BusinessCardComponent } from './shared/business-card/business-card.component';

import { BusinessResolverService } from './shared/business-resolver.service';
import { BusinessInfoComponent } from './business-edit/business-info/business-info.component';
import { BusinessPhotosComponent } from './business-edit/business-photos/business-photos.component';
import { BusinessReviewComponent } from './business-edit/business-review/business-review.component';
import { CONFIG } from '../core/config';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    // CustomFormsModule,
    AgmCoreModule.forRoot({
      apiKey: CONFIG.google_maps.apiKey
    }),
    // CloudinaryModule.forRoot(Cloudinary, {
    //   cloud_name: CONFIG.cloudinary.cloud_name,
    //     upload_preset: CONFIG.cloudinary.upload_preset
    // }),
    SharedModule,
    NavbarModule,
    BusinessesRoutingModule
  ],
  declarations: [
    BusinessListComponent,
    BusinessDetailComponent,
    BusinessEditComponent,
    BusinessCardComponent,
    BusinessInfoComponent,
    BusinessPhotosComponent,
    BusinessReviewComponent,
  ],
  providers: [
    BusinessResolverService
  ]
})
export class BusinessesModule { }
