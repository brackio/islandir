import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DataAccess } from '../../models/data-access';
import { Paging } from '../../core/paging';
import { Business } from './business';
import { CONFIG } from '../../core/config';

const pageLimit: number = CONFIG.paging.limit;

@Injectable()
export class BusinessService extends DataAccess<Business> {
  constructor(
    private http: HttpClient
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
    });
  }

  public search(query: string, country: string, page: number): Observable<Business[]> {
    return this.http.get<Business[]>(`${this.baseUrl}/search?q=${query}&country=${country}&page=${page}&limit=${pageLimit}`);
  }

  public create(business: Business): Observable<Business> {
    const bodyString = JSON.stringify(business);
    return this.http.post<Business>(`${this.baseUrl}`, bodyString);
  }

  public findOne(id: string): Observable<Business> {
    return this.http
      .get<Business>(`${this.baseUrl}/${id}`);
  }

  public findOneBySug(slug: string): Observable<Business> {
    return this.http
      .get<Business>(`${this.baseUrl}/by-slug/${slug}`);
  }

  public getOwner(slug: string): Observable<Business> {
    return this.http
      .get<Business>(`${this.baseUrl}/owner/${slug}`);
  }

  public update(business: Business): Observable<Business> {
    const bodyString = JSON.stringify(business);
    return this.http.put<Business>(`${this.baseUrl}/${business.id}`, bodyString);
  }

  public remove(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
