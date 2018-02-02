import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CovalentCommonModule } from '@covalent/core/common';
import { SharedModule } from '../shared/shared.module';
import { NavbarModule } from '../navbar/navbar.module';
import { FileUploadModule } from 'ng2-file-upload';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';


import { BusinessesRoutingModule } from './businesses-routing.module';
import { CommonModule } from '../common/common.module';

import { BusinessListComponent } from './business-list/business-list.component';
import { BusinessDetailComponent } from './business-detail/business-detail.component';
import { BusinessEditComponent } from './business-edit/business-edit.component';
import { BusinessCardComponent } from './business-card/business-card.component';

import { BusinessService } from './shared/business.service';
import { ServiceService } from '../models/services/service.service';
import { BusinessResolverService } from './shared/business-resolver.service';
import { DialogsService} from '../core/dialog.service';
import { UploadService } from '../common/services/upload.service';

import { GeolocatorService } from '../common/services/geolocator.service';
import { BusinessCreateComponent } from './business-create/business-create.component';
import { BusinessNameEditDialogComponent } from './business-edit/business-name-edit-dialog/business-name-edit-dialog.component';
import { BusinessLocationEditDialogComponent } from './business-edit/business-location-edit-dialog/business-location-edit-dialog.component';
import { BusinessServicesEditDialogComponent } from './business-edit/business-services-edit-dialog/business-services-edit-dialog.component';
import { BusinessContactEditDialogComponent } from './business-edit/business-contact-edit-dialog/business-contact-edit-dialog.component';
import { BusinessDescriptionEditDialogComponent } from './business-edit/business-description-edit-dialog/business-description-edit-dialog.component';
import { BusinessHoursEditDialogComponent } from './business-edit/business-hours-edit-dialog/business-hours-edit-dialog.component';

import { BusinessOverviewComponent } from './business-detail/business-overview/business-overview.component';
import { BusinessPhotosComponent } from './business-detail/business-photos/business-photos.component';
import { BusinessReviewsComponent } from './business-detail/business-reviews/business-reviews.component';
import { BusinessReviewsEditComponent } from './business-edit/business-reviews-edit/business-reviews-edit.component';
import { BusinessPhotosEditComponent } from './business-edit/business-photos-edit/business-photos-edit.component';
import { BusinessInfoEditComponent } from './business-edit/business-info-edit/business-info-edit.component';
import { BusinessManageEditComponent } from './business-edit/business-manage-edit/business-manage-edit.component';
import { CONFIG } from '../core/config';

export const cloudinaryLib = {
  Cloudinary: Cloudinary
};

@NgModule({
  imports: [
    CovalentCommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    InfiniteScrollModule,
    CloudinaryModule.forRoot(cloudinaryLib,
      {
        cloud_name: CONFIG.cloudinary.cloud_name,
        upload_preset: CONFIG.cloudinary.upload_preset
      }
    ),
    CommonModule,
    SharedModule,
    NavbarModule,
    BusinessesRoutingModule
  ],
  declarations: [
    BusinessListComponent,
    BusinessDetailComponent,
    BusinessEditComponent,
    BusinessCardComponent,
    BusinessCreateComponent,
    BusinessNameEditDialogComponent,
    BusinessLocationEditDialogComponent,
    BusinessServicesEditDialogComponent,
    BusinessDescriptionEditDialogComponent,
    BusinessHoursEditDialogComponent,
    BusinessContactEditDialogComponent,
    BusinessOverviewComponent,
    BusinessReviewsEditComponent,
    BusinessPhotosEditComponent,
    BusinessInfoEditComponent,
    BusinessManageEditComponent,
    BusinessPhotosComponent,
    BusinessReviewsComponent
  ],
  entryComponents: [
    BusinessNameEditDialogComponent,
    BusinessLocationEditDialogComponent,
    BusinessServicesEditDialogComponent,
    BusinessDescriptionEditDialogComponent,
    BusinessHoursEditDialogComponent,
    BusinessContactEditDialogComponent
  ],
  providers: [
    GeolocatorService,
    ServiceService,
    BusinessService,
    BusinessResolverService,
    DialogsService,
    UploadService
  ]
})
export class BusinessesModule { }
