import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ilr-rating-score',
  templateUrl: './rating-score.component.html',
  styleUrls: ['./rating-score.component.scss']
})
export class RatingScoreComponent implements OnInit {
  @Input() rating: number;
  @Input() count: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
