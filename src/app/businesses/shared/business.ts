import { User } from '../../user/shared/user';
import { Country } from '../../models/countries/country';

export interface Review {
  id: string;
  review: User;
  rating: number;
  category: {
    prices: number,
    services: number,
    communication: number,
    location: number,
    accuracy: number,
    availability: number
  };
  comment: string;
}

export interface Address {
  country: Country;
  territory: string;
  city: string;
  street: string;
  zip: string;
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
  public reviews: Review[];
  public description: string;
  public createdAt: Date;
  public updatedAt: Date;
  public active: boolean;
  constructor() { }

  get rating(): number {
    let avg = 0;
    let count = 0;
    this.reviews.forEach((review: Review) => {
      avg += review.rating;
      count += 1;
    });
    count = (count === 0) ? 1 : count;
    return avg / count;
  }

}
