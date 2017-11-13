import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/catch';
import 'rxjs/add/observable/throw';

import { LogEntry } from './log-entry';
import { LogPublisher } from './log-publisher';
import { CONFIG } from '../config';

const loggingUrl: string = CONFIG.baseUrls.businesses;

export class LogWebApi extends LogPublisher {

  constructor(private http: HttpClient) {
    super();
    this.location = loggingUrl;
  }


  public log(record: LogEntry): Observable<boolean> {
    return this.http
      .post(this.location,
        record,
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        }).catch(this.handleErrors);
  }

  public  clear(): Observable<boolean> {
    // TODO: Call web api to clear all log entries
    return Observable.of(true);
  }

  private handleErrors(error: any): Observable<any> {
    const errors: string[] = [];
    let msg = '';

    msg = `Status ${error.status}`;
    msg += ` - Status Text: ${error.statusText}`;

    if (error.json()) {
      msg += ` - Exception Message: ${error.json().exceptionMessage}`;
    }

    errors.push(msg);
    console.error('An error occurred', errors);

    return Observable.throw(errors);
  }
}
