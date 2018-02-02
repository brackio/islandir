import { NgModule } from '@angular/core';

import { SingleImageUploadDirective } from './directives/single-image-upload.directive';
import { ImagePreviewDirective } from './directives/image-preview.directive';
import { ClResponsiveImagePipe } from './pipes/cl-responsive-image.pipe';
import { AddressToStringPipe } from './pipes/address-to-string.pipe';
import { BusinessThumbnailPipe } from './pipes/business-thumbnail.pipe';

@NgModule({
  declarations: [
    SingleImageUploadDirective,
    ImagePreviewDirective,
    ClResponsiveImagePipe,
    AddressToStringPipe,
    BusinessThumbnailPipe
  ],
  exports: [
    SingleImageUploadDirective,
    ImagePreviewDirective,
    ClResponsiveImagePipe,
    AddressToStringPipe,
    BusinessThumbnailPipe
  ]
})
export class CommonModule { }
