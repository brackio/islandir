import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search.component';
import { KeywordService } from '../models/keywords/keyword.service';
import { SearchOptionsPipe } from './search-options.pipe';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    SearchComponent,
    SearchOptionsPipe
  ],
  providers: [
    KeywordService
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule { }