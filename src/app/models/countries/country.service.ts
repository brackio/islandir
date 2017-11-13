import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { DataAccess } from '../data-access';
import { PagingService } from '../../core/paging.service';
import { CacheManagerService as Cache } from '../../core/cache-manager.service';
import { Country } from './country';
import { CONFIG } from '../../core/config';

@Injectable()
export class CountryService extends DataAccess<Country> {
  private countries: Country[];
  private currentCountry: Country;

  constructor(
    private http: HttpClient,
    private pagingService: PagingService,
    private cache: Cache
  ) {
    super();
    this.baseUrl = CONFIG.baseUrls.countries;
  }

  get country(): Country {
    return this.currentCountry || this.default();
  }

  set country(country: Country) {
    this.currentCountry = country;
    this.cache.set(CONFIG.vars.currentCountry, JSON.stringify(country));
  }

  private default(): Country {
    const country = JSON.parse(this.cache.get(CONFIG.vars.currentCountry));
    if (country && country.code) {
      return country;
    }
    return new Country(CONFIG.defaultCountry.name, CONFIG.defaultCountry.code);
  }

  public get(page: number,
             limit: number,
             sort: string,
             sortOrder?: string,
             fields?: string[]): Observable<HttpResponse<Country[]>>  {

    const paging = this.pagingService.paginate(page, limit);
    return this.http.get<Country[]>(`${this.baseUrl}`,
      {
        observe: 'response',
        params: new HttpParams()
          .set('page', `${paging.page}`)
          .set('skip', `${paging.skip}`)
          .set('limit', `${paging.limit}`)
          .set('sort', (sortOrder === 'asc' ? '' : '-')  + `${sort}`)
          .set('fields', fields.join())
      });
  }

  public getActive(): Observable<Country[]> {
    if (this.countries) {
      return Observable.of(this.countries);
    } else {
      return this.http.get<Country[]>(`${this.baseUrl}/active?sort=name`);
    }
  }

  public setActive(countries: Country[]): void {
    this.countries = countries;
  }

  public findOne(code: string): Promise<Country> {
    return this.http
      .get<Country>(`${this.baseUrl}/${code}`)
      .toPromise();
  }

  // public findOne(id: string): Promise<Country> {
  //   return this.http
  //     .get<Country>(`${countriesUrl}/${id}`)
  //     .toPromise();
  // }

  public update(country: Country): Promise<Country> {
    const bodyString = JSON.stringify(country);
    return this.http.put<Country>(`${this.baseUrl}/${country.id}`, bodyString)
      .toPromise();
  }

  public create(country: Country): Promise<Country> {
    const bodyString = JSON.stringify(country);
    return this.http.post<Country>(`${this.baseUrl}`, bodyString)
      .toPromise();
  }

  public remove(id: string): Promise<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .toPromise();
  }
}
