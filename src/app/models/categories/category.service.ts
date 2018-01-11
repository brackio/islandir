import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { DataAccess } from '../data-access';
import { ErrorHandler } from '../../core/error-handler';
import { Paging } from '../../core/paging';
import { Category } from './category';
import { CONFIG } from '../../core/config';

@Injectable()
export class CategoryService extends DataAccess<Category> {

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandler
  ) {
    super();
    this.baseUrl = CONFIG.baseUrls.categories;
  }

  public get(page: number,
             limit: number,
             sort: string,
             sortOrder?: string,
             fields?: string[]): Observable<HttpResponse<Category[]>>  {

    const paging = Paging.paginate(page, limit);
    return this.http.get<Category[]>(`${this.baseUrl}`,
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
        catchError(this.errorHandler.error<HttpResponse<Category[]>>('getPagedCategories'))
      );
  }

  public fetch(fields?: string[]): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.baseUrl,
      {
        params: new HttpParams().set('fields', !!fields ? fields.join() : '')
      }).pipe(
        catchError(this.errorHandler.error<Category[]>('getAllCategories', []))
      );
  }

  public featured(): Observable<Category[]> {
    return this.http

      .get<Category[]>(`${this.baseUrl}/featured`)
      .pipe(
        catchError(this.errorHandler.error<Category[]>('getFeaturedCategories', []))
      );
  }

  public popular(country: string, limit: number): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${this.baseUrl}/popular/${country}?limit=${limit}`)
      .pipe(
        catchError(this.errorHandler.error<Category[]>('getPopularCategories', []))
      );
  }

  public findOne(id: string): Observable<Category> {
    return this.http
      .get<Category>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.errorHandler.error<Category>(`getCategory id=${id}`))
      );
  }

  public update(category: Category): Observable<Category> {
    const body = JSON.stringify(category);
    return this.http
      .put<Category>(`${this.baseUrl}/${category.id}`, body)
      .pipe(
        catchError(this.errorHandler.error<Category>(`updateCategory`))
      );
  }

  public create(category: Category): Observable<Category> {
    const body = JSON.stringify(category);
    return this.http
      .post<Category>(`${this.baseUrl}`, body)
      .pipe(
        catchError(this.errorHandler.error<Category>('createCategory'))
      );
  }

  public remove(category: Category | string): Observable<any> {
    const id = typeof category === 'string' ? category : category.id;
    return this.http
      .delete<Category>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.errorHandler.error<Category>('deleteCategory'))
      );
  }
}
