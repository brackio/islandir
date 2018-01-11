import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';

export abstract class DataAccess<T> {
  public baseUrl: string;

  abstract get(page: number,
               limit: number,
               sort: string,
               sortOrder?: string,
               fields?: string[]): Observable<HttpResponse<T[]>>;
  abstract create(item: T): Observable<T>;
  abstract remove(item: T | string): Observable<T>;
  abstract update(item: T): Observable<T>;
  abstract findOne(id: string): Observable<T>;
}
