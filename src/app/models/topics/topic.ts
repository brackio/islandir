export class Topic {
  public id: string;
  public name: string;
  public description: string;
  public tags: [string];
  public image: {
    name: string,
    styles: string,
    thumbnail: string
  };
}
