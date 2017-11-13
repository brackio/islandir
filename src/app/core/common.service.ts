import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {

  constructor() { }

  public dateDiff(gtDate: Date, ltDate: Date): number {
    // return (+gtDate - +ltDate);
    return 2;
  }

  public pathFromUrl(url: string): string {
    return url.split(/[?#;]/)[0];
  }
}
