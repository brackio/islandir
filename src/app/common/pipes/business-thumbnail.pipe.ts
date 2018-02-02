import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'businessThumbnail'
})
export class BusinessThumbnailPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
