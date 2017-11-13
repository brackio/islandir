import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { DataAccess } from '../../models/data-access';
import { PagingService } from '../../core/paging.service';
import { Business } from './business';
import { CONFIG } from '../../core/config';

const pageLimit: number = CONFIG.paging.limit;

@Injectable()
export class BusinessService extends DataAccess<Business> {
  constructor(
    private http: HttpClient,
    private pagingService: PagingService
  ) {
    super();
    this.baseUrl = CONFIG.baseUrls.businesses;
  }

  public get(page: number,
             limit: number,
             sort: string,
             sortOrder?: string,
             fields?: string[]): Observable<HttpResponse<Business[]>> {

    const paging = this.pagingService.paginate(page, limit);
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

  public search(query: string, country: string, page: number): Observable<Business[]>{
    return this.http.get<Business[]>(`${this.baseUrl}/search?q=${query}&country=${country}&page=${page}&limit=${pageLimit}`);
  }

  create(business: Business): Promise<Business> {
    const bodyString = JSON.stringify(business);
    return this.http.post<Business>(`${this.baseUrl}`, bodyString)
      .toPromise();
  }

  public findOne(id: string): Promise<Business> {
    return this.http
      .get<Business>(`${this.baseUrl}/${id}`)
      .toPromise();
  }

  public findOneBySug(slug: string): Promise<Business> {
    return this.http
      .get<Business>(`${this.baseUrl}/by-slug/${slug}`)
      .toPromise();
  }

  public getOwner(slug: string): Promise<Business> {
    return this.http
      .get<Business>(`${this.baseUrl}/owner/${slug}`)
      .toPromise();
  }

  public update(business: Business): Promise<Business> {
    const bodyString = JSON.stringify(business);
    return this.http.put<Business>(`${this.baseUrl}/${business.id}`, bodyString)
      .toPromise();
  }

  public remove(id: string): Promise<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .toPromise();
  }
}
