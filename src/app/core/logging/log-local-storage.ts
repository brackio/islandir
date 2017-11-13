import { LogPublisher } from './log-publisher';
import { LogEntry } from './log-entry';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/of';
import { CONFIG } from '../config';

export class LogLocalStorage extends LogPublisher {
  constructor() {
    super();

    this.location = CONFIG.vars.logging;
  }

  public getAll(): Observable<LogEntry[]> {
    let values: LogEntry[];

    values = JSON.parse(localStorage.getItem(this.location)) || [];
    return Observable.of(values);
  }

  public log(record: LogEntry): Observable<boolean> {
    const ret = false;
    let values: LogEntry[];
    try {
      values = JSON.parse(localStorage.getItem(this.location)) || [];
      // Add new log entry to the entry
      values.push(record);
      // Store the array into the local storage
      localStorage.setItem(this.location, JSON.stringify(values));
    }
    catch (ex) {
      console.log(ex);
    }

    return Observable.of(ret);
  }

  public clear(): Observable<boolean> {
    localStorage.removeItem(this.location);
    return Observable.of(true);
  }

}
