import { User } from '../../user/shared/user';
import { Country } from '../../models/countries/country';

interface IReviews {
  id: string;
}

interface Photos {
  cover: string;
  exterior: [string];
  interior: [string];
  logo: string;
  service: [string];
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
  id: string;
  name: string;
  slug: string;
  photos: [Photos];
  openingHours: Hours;
  address: {
    country: Country,
    territory: string,
    city: string,
    street: string,
    zip: number
  };
  phone: string;
  email: string;
  website: string;
  social: [string];
  services: [string];
  amenities: [string];
  owner: User;
  reviews: [IReviews];
  description: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;

  constructor() { }

}
