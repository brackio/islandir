import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StarRatingModule } from 'angular-star-rating';

import { ReadOnlyRatingStarsComponent } from './read-only-rating-stars/read-only-rating-stars.component';
import { RatingScoreComponent } from './rating-score/rating-score.component';

@NgModule({
  imports: [
    StarRatingModule.forRoot(),
    SharedModule
  ],
  declarations: [
    ReadOnlyRatingStarsComponent,
    RatingScoreComponent
  ],
  exports: [
    ReadOnlyRatingStarsComponent,
    RatingScoreComponent
  ]
})
export class RatingModule { }
