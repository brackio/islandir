import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogPublisher } from './log-publisher';
import { LogConsole } from './log-console';
import { LogLocalStorage } from './log-local-storage';
import { LogPublisherConfig } from './log-publisher-config';
import { LogWebApi } from './log-web-api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/map';
import 'rxjs/operator/catch';
import 'rxjs/operator/throw';

const PUBLISHERS_FILE = 'assets/log-publishers.json';

@Injectable()
export class LogPublisherService {
  public publishers: LogPublisher[] = [];

  constructor(private http: HttpClient) {
    this.buildPublishers();
  }

  public buildPublishers(): void {
    let logPub: LogPublisher;

    this.getLoggers().subscribe(response => {
      for (const pub of response.filter(p => p.isActive)) {
        switch (pub.loggerName.toLowerCase()) {
          case 'console':
            logPub = new LogConsole();
            break;
          case 'localStorage':
            logPub = new LogLocalStorage();
            break;
          case 'webApi':
            logPub = new LogWebApi(this.http);
            break;
        }

        // Set location, if any, of the logging
        logPub.location = pub.loggerLocation;
        // Add publisher to array
        this.publishers.push(logPub);
      }
    });
  }

  public getLoggers(): Observable<LogPublisherConfig[]> {
    return this.http.get(PUBLISHERS_FILE)
      .catch(this.handleErrors);
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
