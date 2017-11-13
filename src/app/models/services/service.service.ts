import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { IPaging, PagingService } from '../../core/paging.service';
import { Service } from './service';
import { CONFIG } from '../../core/config';
const servicesUrl: string = CONFIG.baseUrls.services;

@Injectable()
export class ServiceService{

  constructor(
    public http: HttpClient,
    private pagingService: PagingService
  ) { }

  // public get(limit?: number): Observable<Service[]> {
  //   return this.http.get<Service[]>(`${servicesUrl}`);
  // }

  public get(page: number,
             limit: number,
             sort: string,
             sortOrder?: string,
             fields?: string[]): Observable<HttpResponse<Service[]>>  {

    const IPaging = this.pagingService.paginate(page, limit);
    return this.http.get<Service[]>(`${servicesUrl}`,
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

  public getPopular(country: string, limit: number): Observable<Service[]> {
    return this.http.get<Service[]>(`${servicesUrl}/popular/${country}?limit=${limit}`);
  }

  public findOne(id: string): Promise<Service> {
    return this.http
      .get<Service>(`${servicesUrl}/${id}`)
      .toPromise();
  }

  public update(service: Service): Promise<Service> {
    const bodyString = JSON.stringify(service);
    return this.http.put<Service>(`${servicesUrl}/${service.id}`, bodyString)
      .toPromise();
  }

  public create(service: Service): Promise<Service> {
    const bodyString = JSON.stringify(service);
    return this.http.post<Service>(`${servicesUrl}`, bodyString)
      .toPromise();
  }

  public delete(id: string): Promise<any> {
    return this.http.delete(`${servicesUrl}/${id}`)
      .toPromise();
  }

}
