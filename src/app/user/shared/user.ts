export class User {
  public id: string;
  public firstname: string;
  public lastname: string;
  public username: string;
  public nickname: string;
  public email: string;
  public verified: boolean;
  public picture: string;
  public location: {
    country: string,
    region: string,
    city: string,
    ll: [number]
  };
  public createdAt: Date;
  public roles: string[];

  constructor() {}
}
