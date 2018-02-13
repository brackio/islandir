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
    countryCode: string,
    country: string,
    regionCode: string,
    regionName: string,
    city: string,
    timeZone: string,
    latitude: number,
    longitude: number
  };
  // browserLocation: {
  //   address: {
  //     city: string,
  //     country: string,
  //     countryCode: string,
  //     postalCode: string,
  //     town: string,
  //     state: string,
  //     stateCode: string,
  //     region: string,
  //     street: string,
  //     route: string
  //   }
  //   coords: {
  //     latitude: number,
  //     longitude: number
  //   }
  // };
  public createdAt: Date;
  public roles: string[];

  constructor() {}

}
