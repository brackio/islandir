import { Topic } from '../topics/topic';

export class Theme {
  public id: string;
  public name: string;
  public country: [string];
  public topics: Topic[];
  public startDate: Date;
  public endDate: Date;
}
