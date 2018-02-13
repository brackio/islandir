import { Component, Input } from '@angular/core';

import { Business } from '../shared/business';

@Component({
  selector: 'ilr-business-tile',
  templateUrl: './business-tile.component.html',
  styleUrls: ['./business-tile.component.scss']
})
export class BusinessTileComponent {
  @Input() business: Business;

  constructor() { }

  public dataToShow(business: Business): string {
    if (business.openingHours && (!!business.openingHours.sunday.length
        || !!business.openingHours.monday.length
        || !!business.openingHours.tuesday.length
        || !!business.openingHours.wednesday.length
        || !!business.openingHours.thursday.length
        || !!business.openingHours.friday.length
        || !!business.openingHours.saturday.length
        || !!business.openingHours.sunday.length)) {
      return 'hours';
    } else if (business.address && (!!business.address.street || !!business.address.city)) {
      return 'address';
    } else if (!!business.phone) {
      return 'phone';
    }
  }

}
