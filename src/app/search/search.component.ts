import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/startWith';

import { KeywordService } from '../models/keywords/keyword.service';
import { CountryService } from '../models/countries/country.service';
import { CacheManagerService } from '../core/cache-manager.service';
import { SearchOption } from './search-option';
import { Keyword } from '../models/keywords/keyword';
import { CONFIG } from '../core/config';

@Component({
  selector: 'ilr-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  public keywords: Observable<Keyword[]> ;
  private searchTerms = new Subject<string>();
  private searchHistory = [];

  constructor(
    private keywordService: KeywordService,
    private countryService: CountryService,
    private cache: CacheManagerService,
    private router: Router
  ) { }

  // Push a search term into the observable stream.
  public search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    //this.searchHistory = this.getSearchHistory();

    this.keywords = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .startWith(null)
      .switchMap(term => term ? this.keywordService.search(term) :  Observable.of<Keyword[]>([]))
      .catch(error => Observable.of<Keyword[]>([]));
  }

  public displayFn(option: SearchOption): string {
    return option ? option.text : '';
  }

  public onSubmit(val: string): void {
    this.router.navigate(['/business/search', { q: val.toLowerCase(), country: this.countryService.country.code }]);
  }

  public onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    this.updateSearchHistory(event.option.value);
    const option: SearchOption = event.option.value;

    if (option.index === 'businesss') {
      this.router.navigate(['/business', option.value.toLowerCase()]);
    } else {
      this.router.navigate(['/business/search', { q: option.text.toLowerCase(), country: this.countryService.country.code }]);
    }
  }

  private getSearchHistory(): Observable<Keyword[]> {
    const cache = this.cache.get(CONFIG.vars.searchHistory);
    if (!!cache) {

      const history = new Keyword();
      history.name = JSON.parse(cache);
      const j = [history];

      return Observable.of(j);
    }

    return Observable.of<Keyword[]>([]);
  }

  private updateSearchHistory(search: string): void {
    if (this.searchHistory.length >= CONFIG.searchHistoryLimit ) {
      this.searchHistory.pop();
    }
    this.searchHistory.unshift(search);
    this.cache.set(CONFIG.vars.searchHistory, JSON.stringify(this.searchHistory));
  }




}
