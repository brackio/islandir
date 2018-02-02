import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../../businesses/shared/business';

@Pipe({
  name: 'addressToString'
})
export class AddressToStringPipe implements PipeTransform {

  transform(address: Address, args?: any): string {

    if (address) {
      switch (args) {
        case 'full': return this.fullAddress(address);
        case 'maps': return this.mapsAddress(address);
        default: return this.simpleAddress(address);
      }
    }
  }

  private simpleAddress(address: Address): string {
    if (address.street) {
      return `${address.street}${(!!address.territory) ? ', ' + address.territory : address.country.name}`;
    }
    if (address.city) {
      return address.city;
    }
    if (address.territory) {
      return address.territory;
    }
    return address.country.name;
  }

  private fullAddress(address: Address): string {
    return `${(!!address.street) ? address.street : ''}${(!!address.city) ? ', ' + address.city : ''}${(!!address.territory && (address.territory !== address.city)) ? ', ' + address.territory : ''}${(!!address.country) ? ', ' + address.country.name : ''}${(!!address.zip) ? ', ' + address.zip : ''}`;
  }

  private mapsAddress(address: Address): string {
    const prefix = 'https://www.google.com/maps/search/?api=1&query=';
    return prefix + this.fullAddress(address);
  }
}
