import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { catchError, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { KeywordService } from '../models/keywords/keyword.service';
import { CountryService } from '../models/countries/country.service';
import { CacheManagerService } from '../common/services/cache-manager.service';
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
  private searchHistory: Keyword[] = [];
  private searchTerms = new Subject<string>();

  constructor(
    private keywordService: KeywordService,
    private countryService: CountryService,
    private cache: CacheManagerService,
    private router: Router
  ) {
    this.searchHistory = this.getSearchHistory();
  }

  @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;

  // Push a search term into the observable stream.
  public search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.keywords = this.searchTerms.pipe(
      startWith(null),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => term ? this.keywordService.search(term) :  of<Keyword[]>(this.searchHistory)),
      catchError(error => of<Keyword[]>([])));
  }

  public displayFn(option: SearchOption): string {
    return option ? option.text : '';
  }

  public onSubmit(val: string): void {
    this.onOptionSelected(val);
    this.trigger.closePanel();
  }

  public onOptionSelected(selection: MatAutocompleteSelectedEvent | string): void {
    const option: SearchOption = new SearchOption();
    if (typeof selection === 'string') {
      option.text = selection;
    } else {
      option.text = selection.option.value.text;
      option.value = selection.option.value.value;
      option.index = selection.option.value.index;
    }
    this.updateSearchHistory(option.text);
    if (option.index === 'businesss') {
      console.log(option);
      // this.router.navigate(['/business', option.value.toLowerCase()]);
    } else {
      this.router.navigate(['/business/search', { q: option.text.toLowerCase(), country: this.countryService.country.code }]);
    }
  }

  public removeItemFromHistory(option: SearchOption): void {
    this.searchHistory = this.searchHistory.filter((item: Keyword) => item.name !== option.text);
    this.keywords = of(<Keyword[]>(this.searchHistory));
    this.saveHistory(this.searchHistory);
  }

  private getSearchHistory(): Keyword[] {
    // this.cache.removeItem(CONFIG.vars.searchHistory);
    const cache = this.cache.get(CONFIG.vars.searchHistory);
    return (!!cache) ? JSON.parse(cache) : [];
  }

  private updateSearchHistory(term: Keyword | string): void {
    if (!!term) {
      const keyword: Keyword = typeof term === 'string' ? new Keyword(term) : term;
      if (!(!!this.searchHistory.find(item => item.name === keyword.name))) {
        if (this.searchHistory.length >= CONFIG.searchHistoryLimit) {
          this.searchHistory.pop();
        }
        this.searchHistory.unshift(keyword);
        this.saveHistory(this.searchHistory);
      }
    }
  }

  private saveHistory(history): void {
    this.cache.set(CONFIG.vars.searchHistory, JSON.stringify(history));
  }
}
