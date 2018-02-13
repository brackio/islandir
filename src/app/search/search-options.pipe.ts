import { Pipe, PipeTransform } from '@angular/core';
import { SearchOption } from './search-option';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { BusinessService } from '../businesses/shared/business.service';
import {CONFIG} from '../core/config';

@Pipe({
  name: 'searchOptions'
})

export class SearchOptionsPipe implements PipeTransform {

  constructor (private cloudinary: Cloudinary,
    private businessService: BusinessService
  ) {}

  transform(options: any, args?: any): any {
    const searchOptions: SearchOption[] = [];

    if (!!options) {
      options.forEach(option => {
        switch (option._index) {
          case 'keywords':
            searchOptions.push(new SearchOption(option._index, 'icon', 'search', option._source.name, option._source.name));
            break;
          case 'businesss':
            this.businessService.findOneBySug(option._source.slug)
              .subscribe(business => {
                if (business.photos && business.photos.logo) {
                  searchOptions.push(new SearchOption(option._index, 'url',
                    this.cloudinary.url(business.photos.logo.public_id,
                      {fetch_format: 'auto', quality: 'auto', width: 24, height: 24, crop: 'fill'}),
                    option._source.slug, option._source.name));
                } else {
                  searchOptions.push(new SearchOption(option._index, 'url',
                    this.cloudinary.url(CONFIG.cloudinary.defaultImageId,
                      {fetch_format: 'auto', quality: 'auto', width: 24, height: 24, crop: 'fill'}),
                    option._source.slug, option._source.name));
                }
              });
            break;
          default:
            searchOptions.push(new SearchOption('', 'icon', 'history', option.name, option.name));
            break;
        }
      });
    }
    return searchOptions;
  }

}
