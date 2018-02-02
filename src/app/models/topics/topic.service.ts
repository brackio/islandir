import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { DataAccess } from '../data-access';
import { ErrorHandler } from '../../core/error-handler';
import { Paging } from '../../common/paging';
import { Topic } from './topic';
import { CONFIG } from '../../core/config';

@Injectable()
export class TopicService extends DataAccess<Topic> {

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandler
  ) {
    super();
    this.baseUrl = CONFIG.baseUrls.topics;
  }

  public get(page: number,
             limit: number,
             sort: string,
             sortOrder?: string,
             fields?: string[]): Observable<HttpResponse<Topic[]>> {
    const paging = Paging.paginate(page, limit);
    return this.http.get<Topic[]>(`${this.baseUrl}`,
      {
        observe: 'response',
        params: new HttpParams()
          .set('page', `${paging.page}`)
          .set('skip', `${paging.skip}`)
          .set('limit', `${paging.limit}`)
          .set('sort', (sortOrder === 'asc' ? '' : '-')  + `${sort}`)
          .set('fields', fields.join())
      }).pipe(
        catchError(this.errorHandler.error<HttpResponse<Topic[]>>('getPagedTopics'))
    );
  }

  public fetch(fields?: string[]): Observable<Topic[]> {
    return this.http
      .get<Topic[]>(this.baseUrl,
        {
          params: new HttpParams().set('fields', !!fields ? fields.join() : '')
        }).pipe(
        catchError(this.errorHandler.error<Topic[]>('getAllTopics', []))
      );
  }

  public create(topic: Topic): Observable<Topic> {
    const body = JSON.stringify(topic);
    return this.http
      .post<Topic>(this.baseUrl, body)
      .pipe(
        catchError(this.errorHandler.error<Topic>('createTopic'))
      );
  }

  public remove(topic: Topic | string): Observable<Topic> {
    return undefined;
  }

  public update(topic: Topic): Observable<Topic> {
    const body = JSON.stringify(topic);
    return this.http
      .put<Topic>(`${this.baseUrl}/${topic.id}`, body)
      .pipe(
        catchError(this.errorHandler.error<Topic>('updateTopic'))
      );
  }

  public findOne(id: string): Observable<Topic> {
    return this.http
      .get<Topic>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.errorHandler.error<Topic>(`getTopic id=${id}`))
      );
  }
}
