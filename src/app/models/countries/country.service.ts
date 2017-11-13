import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { IPaging, PagingService } from '../../core/paging.service';
import { CacheManagerService as Cache } from '../../core/cache-manager.service';
import { Country } from './country';
import { CONFIG } from '../../core/config';
const countriesUrl: string = CONFIG.baseUrls.countries;

@Injectable()
export class CountryService {
  private countries: Country[];
  private currentCountry: Country;

  constructor(
    private http: HttpClient,
    private pagingService: PagingService,
    private cache: Cache
  ) { }

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

    const IPaging = this.pagingService.paginate(page, limit);
    return this.http.get<Country[]>(`${countriesUrl}`,
      {
        observe: 'response',
        params: new HttpParams()
          .set('page', `${IPaging.page}`)
          .set('skip', `${IPaging.skip}`)
          .set('limit', `${IPaging.limit}`)
          .set('sort', (sortOrder === 'asc' ? '' : '-')  + `${sort}`)
          .set('fields', fields.join())
      });
  }

  public getActive(): Observable<Country[]> {
    if (this.countries) {
      return Observable.of(this.countries);
    } else {
      return this.http.get<Country[]>(`${countriesUrl}/active?sort=name`);
    }
  }

  public setActive(countries: Country[]): void {
    this.countries = countries;
  }

  public findOne(code: string): Promise<Country> {
    return this.http
      .get<Country>(`${countriesUrl}/${code}`)
      .toPromise();
  }

  // public findOne(id: string): Promise<Country> {
  //   return this.http
  //     .get<Country>(`${countriesUrl}/${id}`)
  //     .toPromise();
  // }

  public update(country: Country): Promise<Country> {
    const bodyString = JSON.stringify(country);
    return this.http.put<Country>(`${countriesUrl}/${country.id}`, bodyString)
      .toPromise();
  }

  public create(country: Country): Promise<Country> {
    const bodyString = JSON.stringify(country);
    return this.http.post<Country>(`${countriesUrl}`, bodyString)
      .toPromise();
  }

  public delete(id: string): Promise<any> {
    return this.http.delete(`${countriesUrl}/${id}`)
      .toPromise();
  }
}
