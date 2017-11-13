import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { IPaging, PagingService } from '../../core/paging.service';
import { Business } from './business';
import { CONFIG } from '../../core/config';

const businessUrl: string = CONFIG.baseUrls.businesses;
const pageLimit: number = CONFIG.paging.limit;

@Injectable()
export class BusinessService {

  constructor(
    private http: HttpClient,
    private pagingService: PagingService
  ) { }

  public get(page: number,
             limit: number,
             sort: string,
             sortOrder?: string,
             fields?: string[]): Observable<HttpResponse<Business[]>> {

    const IPaging = this.pagingService.paginate(page, limit);
    return this.http.get<Business[]>(`${businessUrl}`,
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

  public search(query: string, country: string, page: number): Observable<Business[]>{
    return this.http.get<Business[]>(`${businessUrl}/search?q=${query}&country=${country}&page=${page}&limit=${pageLimit}`);
  }

  public findOne(id: string): Promise<Business> {
    return this.http
      .get<Business>(`${businessUrl}/${id}`)
      .toPromise();
  }

  public findOneBySug(slug: string): Promise<Business> {
    return this.http
      .get<Business>(`${businessUrl}/by-slug/${slug}`)
      .toPromise();
  }

  public getOwner(slug: string): Promise<Business> {
    return this.http
      .get<Business>(`${businessUrl}/owner/${slug}`)
      .toPromise();
  }

  public update(business: Business): Promise<Business> {
    const bodyString = JSON.stringify(business);
    return this.http.put<Business>(`${businessUrl}/${business.id}`, bodyString)
      .toPromise();
  }
}
