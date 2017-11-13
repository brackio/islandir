import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { DataAccess } from '../data-access';
import { PagingService } from '../../core/paging.service';
import { Category } from './category';
import { CONFIG } from '../../core/config';

@Injectable()
export class CategoryService extends DataAccess<Category> {

  constructor(
    private http: HttpClient,
    private pagingService: PagingService
  ) {
    super();
    this.baseUrl = CONFIG.baseUrls.categories;
  }

  public get(page: number,
             limit: number,
             sort: string,
             sortOrder?: string,
             fields?: string[]): Observable<HttpResponse<Category[]>>  {

    const paging = this.pagingService.paginate(page, limit);
    return this.http.get<Category[]>(`${this.baseUrl}`,
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

  public fetch(fields?: string[]): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.baseUrl,
      {
        params: new HttpParams().set('fields', fields.join())
      });
  }

  // public get(limit?: number, exclude?: string[]): Observable<Category[]> {
  //   const options = {
  //     params: new HttpParams()
  //   };
  //   if (exclude) {
  //     exclude.forEach((item) => {
  //       options.params.append('exclude', item);
  //     });
  //   }
  //   options.params.set('sort', 'name');
  //   options.params.set('limit', `${limit}`);
  //
  //   return this.http.get<Category[]>(`${categoriesUrl}`, options );
  // }

  public featured(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/featured`);
  }

  public popular(country: string, limit: number): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/popular/${country}?limit=${limit}`);
  }

  public findOne(id: string): Promise<Category> {
    return this.http
      .get<Category>(`${this.baseUrl}/${id}`)
      .toPromise();
  }

  public update(category: Category): Promise<Category> {
    const bodyString = JSON.stringify(category);
    return this.http.put<Category>(`${this.baseUrl}/${category.id}`, bodyString)
      .toPromise();
  }

  public create(category: Category): Promise<Category> {
    const bodyString = JSON.stringify(category);
    return this.http.post<Category>(`${this.baseUrl}`, bodyString)
      .toPromise();
  }

  public remove(id: string): Promise<Category> {
    return this.http.delete<Category>(`${this.baseUrl}/${id}`)
      .toPromise();
  }
}
