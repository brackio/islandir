import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

export abstract class DataAccess<T> {
  public baseUrl: string;

  abstract get(page: number,
               limit: number,
               sort: string,
               sortOrder?: string,
               fields?: string[]): Observable<HttpResponse<T[]>>;
  abstract create(item: T): Promise<T>;
  abstract remove(id: string): Promise<T>;
  abstract update(item: T): Promise<T>;
  abstract findOne(id: string): Promise<T>;
}
