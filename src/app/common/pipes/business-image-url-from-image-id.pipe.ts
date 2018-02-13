import { Pipe, PipeTransform } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { CONFIG } from '../../core/config';

@Pipe({
  name: 'ilrBusinessImageUrlFormImageId'
})
export class BusinessImageUrlFromImageIdPipe implements PipeTransform {

  constructor(private cloudinary: Cloudinary) {}

  transform(public_id: any, args?: any): string {
    if (!!public_id) {
      if (args) {
        return this.cloudinary.url(public_id, args);
      }
      return public_id;
    }
    return this.cloudinary.url(CONFIG.cloudinary.defaultImageId, args);
  }
}

