import { User } from '../../user/shared/user';
import { Country } from '../../models/countries/country';

interface IReviews {
  id: string;
}

export interface Address {
  country: Country;
  territory: string;
  city: string;
  street: string;
  zip: number;
}


export interface Photo {
  public_id: string;
  publisher?: string;
  url: string;
  comment?: string;
  uploadedOn?: Date;
  archivedOn?: Date;
  filename: string;
  tags?: [string];
}

interface Hours {
  sunday: [ { opens: string, closes: string } ];
  monday: [ { opens: string, closes: string } ];
  tuesday: [ { opens: string, closes: string } ];
  wednesday: [ { opens: string, closes: string } ];
  thursday: [ { opens: string, closes: string } ];
  friday: [ { opens: string, closes: string } ];
  saturday: [ { opens: string, closes: string } ];
}

export class Business {
  public id: string;
  public name: string;
  public slug: string;
  public photos: {
    logo: Photo,
    cover: Photo,
    gallery: Photo[]
  };
  public openingHours: Hours;
  public address: Address;
  public latitude: number;
  public longitude: number;
  public phone: string;
  public email: string;
  public website: string;
  public social: [string];
  public services: [string];
  public amenities: [string];
  public owner: User;
  public reviews: IReviews[];
  public description: string;
  public createdAt: Date;
  public updatedAt: Date;
  public active: boolean;

  constructor() { }

}
