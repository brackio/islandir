import { ErrorHandler as ErrorHandling, Injectable } from '@angular/core';
// import { ErrorLogService } from './error-log.service';
// import { LogglyLoggerService } from './loggly-logger.service';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class ErrorHandler extends ErrorHandling {

  constructor(
    // private errorLogService: ErrorLogService,
    // private logglyLoggerService: LogglyLoggerService,
  ) {
    super();
  }

  // public error(error: any): void {
  //   this.errorLogService.logError(error);
  //   // this.logglyLoggerService.log(error);
  // }

  public error<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead
      this.logError(error);

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
      // this.logglyLoggerService.log(`${operation} failed: ${error.message}`)

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private logError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      console.error('There was an HTTP error.', error.message, 'Status code:', (<HttpErrorResponse>error).status);
    } else if (error instanceof TypeError) {
      console.error('There was a Type error.', error.message);
    } else if (error instanceof Error) {
      console.error('There was a general error.', error.message);
    } else {
      console.error(error);
    }
  }
}
