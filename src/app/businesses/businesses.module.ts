import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

import { BusinessService } from './shared/business.service';
import { ServiceService } from '../models/services/service.service';
import { BusinessResolverService } from './shared/business-resolver.service';

import { ImageUploadDirective } from '../shared/directives/image-upload.directive';

import { CONFIG } from '../core/config';
import { BusinessCreateComponent } from './business-create/business-create.component';
import { BusinessNameEditDialogComponent } from './business-edit/business-name-edit-dialog/business-name-edit-dialog.component';
import { BusinessLocationEditDialogComponent } from './business-edit/business-location-edit-dialog/business-location-edit-dialog.component';
import { BusinessPhoneEditDialogComponent } from './business-edit/business-phone-edit-dialog/business-phone-edit-dialog.component';
import { BusinessEmailEditDialogComponent } from './business-edit/business-email-edit-dialog/business-email-edit-dialog.component';
import { BusinessServicesEditDialogComponent } from './business-edit/business-services-edit-dialog/business-services-edit-dialog.component';
import { BusinessSocialEditDialogComponent } from './business-edit/business-social-edit-dialog/business-social-edit-dialog.component';
import { BusinessDescriptionEditDialogComponent } from './business-edit/business-description-edit-dialog/business-description-edit-dialog.component';
import { BusinessHoursEditDialogComponent } from './business-edit/business-hours-edit-dialog/business-hours-edit-dialog.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    // AgmCoreModule.forRoot({
    //   apiKey: CONFIG.google_maps.apiKey
    // }),
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
    ImageUploadDirective,
    BusinessCreateComponent,
    BusinessNameEditDialogComponent,
    BusinessLocationEditDialogComponent,
    BusinessPhoneEditDialogComponent,
    BusinessEmailEditDialogComponent,
    BusinessServicesEditDialogComponent,
    BusinessSocialEditDialogComponent,
    BusinessDescriptionEditDialogComponent,
    BusinessHoursEditDialogComponent
  ],
  entryComponents: [
    BusinessNameEditDialogComponent,
    BusinessLocationEditDialogComponent,
    BusinessPhoneEditDialogComponent,
    BusinessEmailEditDialogComponent,
    BusinessServicesEditDialogComponent,
    BusinessSocialEditDialogComponent,
    BusinessDescriptionEditDialogComponent,
    BusinessHoursEditDialogComponent
  ],
  providers: [
    ServiceService,
    BusinessService,
    BusinessResolverService
  ]
})
export class BusinessesModule { }
