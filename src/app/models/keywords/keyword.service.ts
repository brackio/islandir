import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { DataAccess } from '../data-access';
import { PagingService } from '../../core/paging.service';
import { Keyword } from './keyword';
import { CONFIG } from '../../core/config';

@Injectable()
export class KeywordService extends DataAccess<Keyword> {

  constructor(
    private http: HttpClient,
    private pagingService: PagingService
  ) {
    super();
    this.baseUrl = CONFIG.baseUrls.keywords;
  }

  public get(page: number,
             limit: number,
             sort: string,
             sortOrder?: string,
             fields?: string[]): Observable<HttpResponse<Keyword[]>>  {

    const paging = this.pagingService.paginate(page, limit);
    return this.http.get<Keyword[]>(`${this.baseUrl}`,
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

  public search(query: string): Observable<Keyword[]> {
    if (query === '') {
      return Observable.of([]);
    }
    return this.http.get<Keyword[]>(`${this.baseUrl}/search?q=${query}`);
  }

  public findOne(id: string): Promise<Keyword> {
    return this.http
      .get<Keyword>(`${this.baseUrl}/${id}`)
      .toPromise();
  }

  public update(keyword: Keyword): Promise<Keyword> {
    const bodyString = JSON.stringify(keyword);
    return this.http.put<Keyword>(`${this.baseUrl}/${keyword.id}`, bodyString)
      .toPromise();
  }

  public create(keyword: Keyword): Promise<Keyword> {
    const bodyString = JSON.stringify(keyword);
    return this.http.post<Keyword>(`${this.baseUrl}`, bodyString)
      .toPromise();
  }

  public remove(id: string): Promise<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .toPromise();
  }
}
