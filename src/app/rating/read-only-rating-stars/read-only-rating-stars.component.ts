import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ilr-read-only-rating-stars',
  templateUrl: './read-only-rating-stars.component.html',
  styleUrls: ['./read-only-rating-stars.component.scss']
})
export class ReadOnlyRatingStarsComponent implements OnInit {
  @Input() rating: number;
  @Input() count: number = 0;
  public hasRating: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (this.count > 0) {
      this.hasRating = true;
    }
  }
}
