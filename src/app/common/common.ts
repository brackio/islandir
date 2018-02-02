export class Common {

  constructor() { }

  static dateDiff(gtDate: Date, ltDate: Date): number {
    // return (+gtDate - +ltDate);
    return 2;
  }

  static pathFromUrl(url: string): string {
    return url.split(/[?#;]/)[0];
  }
}
