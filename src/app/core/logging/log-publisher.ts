import { Observable } from 'rxjs/Observable';
import { LogEntry } from './log-entry';

export abstract class LogPublisher {
  public location: string;

  abstract log(record: LogEntry): Observable<boolean>;
  abstract clear(): Observable<boolean>;
}
