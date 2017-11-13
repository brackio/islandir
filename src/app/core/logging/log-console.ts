import { LogPublisher } from './log-publisher';
import { LogEntry } from './log-entry';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/of';

export class LogConsole extends LogPublisher {

  log(record: LogEntry): Observable<boolean> {
    // Log to the console
    console.log(record.buildLogString());

    return Observable.of(true);
  }

  clear(): Observable<boolean> {
    console.clear();
    return Observable.of(true);
  }
}
