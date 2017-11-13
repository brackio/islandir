import { Injectable } from '@angular/core';
import { CONFIG } from './config';

@Injectable()
export class LogglyLoggerService {
  private loggly: any = new LogglyTracker();

  constructor() {
    this.loggly.push({
      logglyKey: CONFIG.loggly.customer_Token,
      sendConsoleErrors: true,
      tag: 'Islandir-logs'
    });
  }

  public log(error: Error): void {
    // do not push error as it will fail due to circular structure
    this.loggly.push({ message: error.message, stack: error.stack });
  }
}
