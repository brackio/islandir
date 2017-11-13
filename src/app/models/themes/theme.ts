import { Topic } from '../topics/topic';
import { Category } from '../categories/category';

export class Theme {
  name: string;
  country: string;
  topics: Topic[];
  categories: Category[];
  startDate: Date;
  endDate: Date;
}
