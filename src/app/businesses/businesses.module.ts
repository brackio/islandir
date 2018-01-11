import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NavbarModule } from '../navbar/navbar.module';
import { NgUploaderModule  } from 'ngx-uploader';

import { BusinessesRoutingModule } from './businesses-routing.module';
import { BusinessListComponent } from './business-list/business-list.component';
import { BusinessDetailComponent } from './business-detail/business-detail.component';
import { BusinessEditComponent } from './business-edit/business-edit.component';
import { BusinessCardComponent } from './shared/business-card/business-card.component';

import { BusinessService } from './shared/business.service';
import { ServiceService } from '../models/services/service.service';
import { BusinessResolverService } from './shared/business-resolver.service';
import { DialogsService} from '../core/dialog.service';
import { UploadService } from '../core/upload.service';

import { GeolocatorService } from '../core/geolocator.service';
import { BusinessCreateComponent } from './business-create/business-create.component';
import { BusinessNameEditDialogComponent } from './business-edit/business-name-edit-dialog/business-name-edit-dialog.component';
import { BusinessLocationEditDialogComponent } from './business-edit/business-location-edit-dialog/business-location-edit-dialog.component';
import { BusinessServicesEditDialogComponent } from './business-edit/business-services-edit-dialog/business-services-edit-dialog.component';
import { BusinessContactEditDialogComponent } from './business-edit/business-contact-edit-dialog/business-contact-edit-dialog.component';
import { BusinessDescriptionEditDialogComponent } from './business-edit/business-description-edit-dialog/business-description-edit-dialog.component';
import { BusinessHoursEditDialogComponent } from './business-edit/business-hours-edit-dialog/business-hours-edit-dialog.component';
import { BusinessInfoComponent } from './business-edit/business-info/business-info.component';
import { BusinessPhotosComponent } from './business-edit/business-photos/business-photos.component';
import { BusinessReviewsComponent } from './business-edit/business-reviews/business-reviews.component';
import { BusinessManageComponent } from './business-edit/business-manage/business-manage.component';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgUploaderModule,
    // AgmCoreModule.forRoot({
    //   apiKey: CONFIG.google_maps.apiKey
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
    BusinessCreateComponent,
    BusinessNameEditDialogComponent,
    BusinessLocationEditDialogComponent,
    BusinessServicesEditDialogComponent,
    BusinessDescriptionEditDialogComponent,
    BusinessHoursEditDialogComponent,
    BusinessInfoComponent,
    BusinessPhotosComponent,
    BusinessReviewsComponent,
    BusinessManageComponent,
    BusinessContactEditDialogComponent
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
