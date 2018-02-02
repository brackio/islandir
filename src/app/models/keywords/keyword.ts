export class Keyword {
  id: string;
  name: string;
  weight: number;
  // approved: boolean;
  // synonyms: [string];

  constructor(name?: string) {
    this.name = name;
  }
}
