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
  sunday: { openAt: number, closesAt: number, allDay: boolean };
  monday: { openAt: number, closesAt: number, allDay: boolean };
  tuesday: { openAt: number, closesAt: number, allDay: boolean };
  wednesday: { openAt: number, closesAt: number, allDay: boolean };
  thursday: { openAt: number, closesAt: number, allDay: boolean };
  friday: { openAt: number, closesAt: number, allDay: boolean };
  saturday: { openAt: number, closesAt: number, allDay: boolean };
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
