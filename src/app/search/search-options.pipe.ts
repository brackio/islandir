import { Pipe, PipeTransform } from '@angular/core';
import { SearchOption } from './search-option';

@Pipe({
  name: 'searchOptions'
})

export class SearchOptionsPipe implements PipeTransform {

  transform(options: any, args?: any): any {
    const searchOptions: SearchOption[] = [];

    options.forEach(option => {
      switch (option._index) {
        case 'keywords':
          searchOptions.push(new SearchOption(option._index, 'search', option._source.name, option._source.name));
          break;
        case 'businesss':
          searchOptions.push(new SearchOption(option._index, 'store', option._source.slug, option._source.name));
          break;
        default:
          searchOptions.push(new SearchOption('', 'history', option, option));
          break;
      }
    });
    return searchOptions;
  }

}
