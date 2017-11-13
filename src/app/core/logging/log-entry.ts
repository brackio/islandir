import { LogLevel } from './log-level.enum';

export class LogEntry {
  entryDate: Date = new Date();
  message = '';
  level: LogLevel = LogLevel.Debug;
  extraInfo: any[] = [];
  logWithDate = true;

  public buildLogString(): string {
    let ret = '';

    if (this.logWithDate) {
      ret = new Date() + ' - ';
    }
    ret += 'Type: ' + LogLevel[this.level];
    ret += ' - Message: ' + JSON.stringify(this.message);
    if (this.extraInfo.length) {
      ret += ' - Extra Info: ' + this.formatParams(this.extraInfo);
    }

    return ret;
  }

  private formatParams(params: any[]): string {
    let ret: string = params.join(',');

    if (params.some(p => typeof p == 'object')) {
      ret = '';
      for (const item of params) {
        ret += JSON.stringify(item) + ',';
      }
    }
    return ret;
  }
}
