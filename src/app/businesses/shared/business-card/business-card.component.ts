import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Business } from '../business';

@Component({
  selector: 'ilr-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.scss']
})
export class BusinessCardComponent {
  @Input() business: Business;
  @Output() onCardSelected: EventEmitter<Business> = new EventEmitter<Business>();

  constructor() { }

  public onClick(business: Business): void {
    this.onCardSelected.emit(business);
  }
}
