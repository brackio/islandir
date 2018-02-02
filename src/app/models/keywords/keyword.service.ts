import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of'

import { DataAccess } from '../data-access';
import { ErrorHandler } from '../../core/error-handler';
import { Paging } from '../../common/paging';
import { Keyword } from './keyword';
import { CONFIG } from '../../core/config';

@Injectable()
export class KeywordService extends DataAccess<Keyword> {

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandler
  ) {
    super();
    this.baseUrl = CONFIG.baseUrls.keywords;
  }

  public get(page: number,
             limit: number,
             sort: string,
             sortOrder?: string,
             fields?: string[]): Observable<HttpResponse<Keyword[]>>  {

    const paging = Paging.paginate(page, limit);
    return this.http.get<Keyword[]>(`${this.baseUrl}`,
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
        catchError(this.errorHandler.error<HttpResponse<Keyword[]>>('getPagedKeywords'))
      );
  }

  public search(query: string): Observable<Keyword[]> {
    if (query === '') {
      return of([]);
    }
    return this.http
      .get<Keyword[]>(`${this.baseUrl}/search?q=${query}`)
      .pipe(
        catchError(this.errorHandler.error<Keyword[]>('searchKeyword', []))
      );
  }

  public findOne(id: string): Observable<Keyword> {
    return this.http
      .get<Keyword>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.errorHandler.error<Keyword>('getKeyword'))
      );
  }

  public update(keyword: Keyword): Observable<Keyword> {
    const bodyString = JSON.stringify(keyword);
    return this.http
      .put<Keyword>(`${this.baseUrl}/${keyword.id}`, bodyString)
      .pipe(
        catchError(this.errorHandler.error<Keyword>('updateKeyword'))
      );
  }

  public create(keyword: Keyword): Observable<Keyword> {
    const bodyString = JSON.stringify(keyword);
    return this.http
      .post<Keyword>(`${this.baseUrl}`, bodyString)
      .pipe(
        catchError(this.errorHandler.error<Keyword>('createKeyword'))
      );
  }

  public remove(keyword: Keyword | string): Observable<any> {
    const id = typeof keyword === 'string' ? keyword : keyword.id;
    return this.http
      .delete(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.errorHandler.error<Keyword>('deleteKeyword'))
      );
  }
}
