import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ImagePlaceholderDirective } from './directives/image-placeholder.directive';
import { ImagePreviewDirective } from './directives/image-preview.directive';
import { BusinessImageUrlFromImageIdPipe } from './pipes/business-image-url-from-image-id.pipe';
import { AddressToStringPipe } from './pipes/address-to-string.pipe';
import { BusinessThumbnailPipe } from './pipes/business-thumbnail.pipe';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ImagePlaceholderDirective,
    ImagePreviewDirective,
    BusinessImageUrlFromImageIdPipe,
    AddressToStringPipe,
    BusinessThumbnailPipe
  ],
  exports: [
    ImagePlaceholderDirective,
    ImagePreviewDirective,
    BusinessImageUrlFromImageIdPipe,
    AddressToStringPipe,
    BusinessThumbnailPipe
  ]
})
export class CommonModule { }
