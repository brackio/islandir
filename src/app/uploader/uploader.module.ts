import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { NgUploaderModule } from 'ngx-uploader';

import { DragDropZoneComponent } from './drag-drop-zone/drag-drop-zone.component';
import { CONFIG } from '../core/config';

export const cloudinaryLib = {
  Cloudinary: Cloudinary
};

@NgModule({
  imports: [
    SharedModule,
    NgUploaderModule,
    CloudinaryModule.forRoot(cloudinaryLib,
      {
        cloud_name: CONFIG.cloudinary.cloud_name,
        upload_preset: CONFIG.cloudinary.upload_preset
      }
    ),
  ],
  declarations: [
    DragDropZoneComponent
  ],
  exports: [
    DragDropZoneComponent
  ],
})
export class UploaderModule { }
