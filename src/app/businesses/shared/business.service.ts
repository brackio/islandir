import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { DataAccess } from '../../models/data-access';
import { ErrorHandler } from '../../core/error-handler';
import { Paging } from '../../common/paging';
import { Business } from './business';
import { CONFIG } from '../../core/config';

const pageLimit: number = CONFIG.paging.limit;

@Injectable()
export class BusinessService extends DataAccess<Business> {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandler
  ) {
    super();
    this.baseUrl = CONFIG.baseUrls.businesses;
  }

  public get(page: number,
             limit: number,
             sort: string,
             sortOrder?: string,
             fields?: string[]): Observable<HttpResponse<Business[]>> {

    const paging = Paging.paginate(page, limit);
    return this.http.get<Business[]>(`${this.baseUrl}`,
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
        catchError(this.errorHandler.error<HttpResponse<Business[]>>('getPagedBusinesses'))
      );
  }

  public search(page: number,
                limit: number,
                query: string,
                country: string,
                services?: string,
                amenities?: string,
                territories?: string,
                hasImages?: boolean): Observable<HttpResponse<Business[]>> {

    const paging = Paging.paginate(page, limit);
    return this.http
      .get<Business[]>(`${this.baseUrl}/search`,
        {
          observe: 'response',
          params: new HttpParams()
            .set('page', `${paging.page}`)
            .set('skip', `${paging.skip}`)
            .set('limit', `${paging.limit}`)
            .set('q', query)
            .set('country', `${country}`)
            .set('services', `${services || ''}`)
            .set('amenities', `${amenities || ''}`)
            .set('territories', `${territories || ''}`)
            .set('hasImages', `${hasImages || ''}`)
          })
      .pipe(
        catchError(this.errorHandler.error<HttpResponse<Business[]>>('searchBusinesses'))
      );
  }

  public filteredServices(query: string,
                          country: string,
                          services?: string,
                          amenities?: string,
                          territories?: string,
                          hasImages?: boolean): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/services`,
        {
          params: new HttpParams()
            .set('q', query)
            .set('country', `${country}`)
            .set('services', `${services || ''}`)
            .set('amenities', `${amenities || ''}`)
            .set('territories', `${territories || ''}`)
            .set('hasImages', `${hasImages || ''}`)
          })
      .pipe(
        catchError(this.errorHandler.error<any>('get'))
      );
  }

  public create(business: Business): Observable<Business> {
    const body = JSON.stringify(business);
    return this.http
      .post<Business>(`${this.baseUrl}`, body)
      .pipe(
        catchError(this.errorHandler.error<Business>('createBusiness'))
      );
  }

  public findOne(id: string): Observable<Business> {
    return this.http
      .get<Business>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.errorHandler.error<Business>(`getBusinessById id=${id}`))
      );
  }



  public findOneBySug(slug: string): Observable<Business> {
    return this.http
      .get<Business>(`${this.baseUrl}/by-slug/${slug}`)
      .pipe(
        catchError(this.errorHandler.error<Business>(`getBusinessBySlug slug=${slug}`))
      );
  }

  public getOwner(slug: string): Observable<Business> {
    return this.http
      .get<Business>(`${this.baseUrl}/owner/${slug}`)
      .pipe(
        catchError(this.errorHandler.error<Business>(`getBusinessOwnerBySlug slug${slug}`))
      );
  }

  public update(business: Business): Observable<Business> {
    const body = JSON.stringify(business);
    return this.http
      .put<Business>(`${this.baseUrl}/${business.id}`, body)
      .pipe(
        catchError(this.errorHandler.error<Business>('updateBusiness'))
      );
  }

  public remove(business: Business | string): Observable<any> {
    const id = typeof business === 'string' ? business : business.id;
    return this.http
      .delete(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.errorHandler.error('deleteBusiness'))
      );
  }
}
