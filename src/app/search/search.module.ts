import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';

import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search.component';
import { KeywordService } from '../models/keywords/keyword.service';
import { BusinessService } from '../businesses/shared/business.service';
import { SearchOptionsPipe } from './search-options.pipe';
import { SearchFocusDirective } from './search-focus.directive';

import { CONFIG } from '../core/config';

export const cloudinaryLib = {
  Cloudinary: Cloudinary
};

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    CloudinaryModule.forRoot(cloudinaryLib,
      {
        cloud_name: CONFIG.cloudinary.cloud_name,
        upload_preset: CONFIG.cloudinary.upload_preset
      }
    ),
    RouterModule
  ],
  declarations: [
    SearchComponent,
    SearchOptionsPipe,
    SearchFocusDirective
  ],
  providers: [
    KeywordService,
    BusinessService
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule { }
