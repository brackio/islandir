import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { DataAccess } from '../data-access';
import { Paging } from '../../core/paging';
import { Service } from './service';
import { CONFIG } from '../../core/config';

@Injectable()
export class ServiceService extends DataAccess<Service> {

  constructor(
    public http: HttpClient
  ) {
    super();
    this.baseUrl = CONFIG.baseUrls.services;
  }

  // public get(limit?: number): Observable<Service[]> {
  //   return this.http.get<Service[]>(`${servicesUrl}`);
  // }

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
      });
  }

  public search(query: string,
                limit?: number,
                sort?: string,
                sortOrder?: string,
                fields?: string[]): Observable<Service[]> {
    if (query === '') {
      return Observable.of([]);
    }
    return this.http.get<Service[]>(`${this.baseUrl}/search?q=${query}`,
      {
        params: new HttpParams()
          .set('limit', `${limit}`)
          .set('sort', (sortOrder === 'asc' ? '' : '-') + `${sort}`)
          .set('fields', fields.join())
      });
  }

  public getPopular(country: string, limit: number): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.baseUrl}/popular/${country}?limit=${limit}`);
  }

  public findOne(id: string): Promise<Service> {
    return this.http
      .get<Service>(`${this.baseUrl}/${id}`)
      .toPromise();
  }

  public update(service: Service): Promise<Service> {
    const bodyString = JSON.stringify(service);
    return this.http.put<Service>(`${this.baseUrl}/${service.id}`, bodyString)
      .toPromise();
  }

  public create(service: Service): Promise<Service> {
    const bodyString = JSON.stringify(service);
    return this.http.post<Service>(`${this.baseUrl}`, bodyString)
      .toPromise();
  }

  public remove(id: string): Promise<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .toPromise();
  }

}
