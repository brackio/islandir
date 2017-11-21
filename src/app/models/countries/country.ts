export class Country {
  public id: string;
  public name: string;
  public code: string;
  public active: boolean;
  public hasZipCode: boolean;
  public territories: [string];

  constructor(name?: string, code?: string) {
    this.code = code;
    this.name = name;
  }

}
