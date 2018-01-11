import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { DataAccess } from '../data-access';
import { ErrorHandler } from '../../core/error-handler';
import { Paging } from '../../core/paging';
import { CacheManagerService as Cache } from '../../core/cache-manager.service';
import { Country } from './country';
import { CONFIG } from '../../core/config';

@Injectable()
export class CountryService extends DataAccess<Country> {
  private countries: Country[];
  private currentCountry: Country;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandler,
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

    const paging = Paging.paginate(page, limit);
    return this.http.get<Country[]>(`${this.baseUrl}`,
      {
        observe: 'response',
        params: new HttpParams()
          .set('page', `${paging.page}`)
          .set('skip', `${paging.skip}`)
          .set('limit', `${paging.limit}`)
          .set('sort', (sortOrder === 'asc' ? '' : '-')  + `${sort}`)
          .set('fields', fields.join())
      })
      .pipe(
        catchError(this.errorHandler.error<HttpResponse<Country[]>>('getPagedCoutries'))
      );
  }

  public getActive(fields?: string[]): Observable<Country[]> {
    if (this.countries) {
      return Observable.of(this.countries);
    } else {
      return this.http
        .get<Country[]>(`${this.baseUrl}/active?sort=name`,
          { params: new HttpParams().set('fields', !!fields ? fields.join() : '') })
        .pipe(
          catchError(this.errorHandler.error<Country[]>('getActiveCountries', []))
        );
    }
  }

  public setActive(countries: Country[]): void {
    this.countries = countries;
  }

  public findOne(code: string): Observable<Country> {
    return this.http
      .get<Country>(`${this.baseUrl}/${code}`)
      .pipe(
        catchError(this.errorHandler.error<Country>(`getCountry code=${code}`))
      );
  }

  public update(country: Country): Observable<Country> {
    const body = JSON.stringify(country);
    return this.http
      .put<Country>(`${this.baseUrl}/${country.id}`, body)
      .pipe(
        catchError(this.errorHandler.error<Country>('updateCountry'))
      );
  }

  public create(country: Country): Observable<Country> {
    const body = JSON.stringify(country);
    return this.http
      .post<Country>(`${this.baseUrl}`, body)
      .pipe(
        catchError(this.errorHandler.error<Country>('createCountry'))
      );
  }

  public remove(country: Country | string): Observable<any> {
    const id = typeof country === 'string' ? country : country.id;
    return this.http
      .delete(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.errorHandler.error<Country>('deleteCountry'))
      );
  }
}
