import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorLogService } from './error-log.service';
// import { LogglyLoggerService } from './loggly-logger.service';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {

  constructor(
    private errorLogService: ErrorLogService,
    // private logglyLoggerService: LogglyLoggerService,
  ) {
    super();
  }

  public handleError(error: any): void {
    this.errorLogService.logError(error);
    // this.logglyLoggerService.log(error);
  }
}
