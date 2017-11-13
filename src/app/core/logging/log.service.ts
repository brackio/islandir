import { Injectable } from '@angular/core';
import { LogLevel } from './log-level.enum';
import { LogEntry } from './log-entry';
import { LogPublisher } from './log-publisher';
import { LogPublisherService } from './log-publisher.service';

@Injectable()
export class LogService {
  public level: LogLevel = LogLevel.All;
  public logWithDate = true;
  public publishers: LogPublisher[];

  constructor(
    private publisherService: LogPublisherService
  ) {
    // Set all the publishers into the local array
    this.publishers = this.publisherService.publishers;
  }

  private shouldLog(level: LogLevel): boolean {
    const ret = false;

    if (this.level !== LogLevel.Off && level >= this.level) {
      return true;
    }
    return ret;
  }

  public debug(msg: string, ...optionalParams: any[]): void {
    this.writeToLog(msg, LogLevel.Debug, optionalParams);
  }

  public info(msg: string, ...optionalParams: any[]): void {
    this.writeToLog(msg, LogLevel.Info, optionalParams);
  }

  public warn(msg: string, ...optionalParams: any[]): void {
    this.writeToLog(msg, LogLevel.Warn, optionalParams);
  }

  public error(msg: string, ...optionalParams: any[]): void {
    this.writeToLog(msg, LogLevel.Error, optionalParams);

    // if (error instanceof HttpErrorResponse) {
    //   console.error('There was an HTTP error.', error.message, 'Status code:', (<HttpErrorResponse>error).status);
    // } else if (error instanceof TypeError) {
    //   console.error('There was a Type error.', error.message);
    // } else if (error instanceof Error) {
    //   console.error('There was a general error.', error.message);
    // } else {
    //   console.error('Nobody threw an error but something happened!', error);
    // }
  }

  public fatal(msg: string, ...optionalParams: any[]): void {
    this.writeToLog(msg, LogLevel.Fatal, optionalParams);
  }

  public log(msg: string, ...optionalParams: any[]): void {
    this.writeToLog(msg, LogLevel.All, optionalParams);
  }

  public clear(): void {
    for (const logger of this.publishers) {
      logger.clear();
    }
  }

  private writeToLog(msg: string, level: LogLevel, params: any[]): void {
    if (this.shouldLog(level)) {
      const entry: LogEntry = new LogEntry();

      entry.message = msg;
      entry.level = level;
      entry.extraInfo = params;
      entry.logWithDate = this.logWithDate;

      // Log the value to all publishers
      for (const logger of this.publishers) {
        logger.log(entry).subscribe(response => console.log(response));
      }
    }
  }
}
