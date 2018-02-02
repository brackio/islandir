import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { DataAccess } from '../data-access';
import { ErrorHandler } from '../../core/error-handler';
import { Paging } from '../../common/paging';
import { Service } from './service';
import { CONFIG } from '../../core/config';

@Injectable()
export class ServiceService extends DataAccess<Service> {

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandler
  ) {
    super();
    this.baseUrl = CONFIG.baseUrls.services;
  }

  public get(page: number,
             limit: number,
             sort: string,
             sortOrder?: string,
             fields?: string[]): Observable<HttpResponse<Service[]>>  {

    const paging = Paging.paginate(page, limit);
    return this.http.get<Service[]>(`${this.baseUrl}`,
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
        catchError(this.errorHandler.error<HttpResponse<Service[]>>('getPagedServices'))
      );
  }

  public search(query: string,
                limit?: number,
                sort?: string,
                sortOrder?: string,
                fields?: string[]): Observable<Service[]> {
    if (query === '') {
      return of([]);
    }
    return this.http.get<Service[]>(`${this.baseUrl}/search?q=${query}`,
      {
        params: new HttpParams()
          .set('limit', `${limit}`)
          .set('sort', (sortOrder === 'asc' ? '' : '-') + `${sort}`)
          .set('fields', fields.join())
      })
      . pipe(
        catchError(this.errorHandler.error<Service[]>('searchKeywords', []))
      );
  }

  public getPopular(country: string, limit: number): Observable<Service[]> {
    return this.http
      .get<Service[]>(`${this.baseUrl}/popular/${country}?limit=${limit}`)
      .pipe(
        catchError(this.errorHandler.error<Service[]>('getPopularServices', []))
      );
  }

  public findOne(id: string): Observable<Service> {
    return this.http
      .get<Service>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.errorHandler.error<Service>('getService'))
      );
  }

  public update(service: Service): Observable<Service> {
    const bodyString = JSON.stringify(service);
    return this.http
      .put<Service>(`${this.baseUrl}/${service.id}`, bodyString)
      .pipe(
        catchError(this.errorHandler.error<Service>('updateService'))
      );
  }

  public create(service: Service): Observable<Service> {
    const bodyString = JSON.stringify(service);
    return this.http
      .post<Service>(`${this.baseUrl}`, bodyString)
      .pipe(
        catchError(this.errorHandler.error<Service>('createService'))
      );
  }

  public remove(service: Service | string): Observable<any> {
    const id = typeof service === 'string' ? service : service.id;
    return this.http
      .delete(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.errorHandler.error<Service>('deleteService'))
      );
  }

}
