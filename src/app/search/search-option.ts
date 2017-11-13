export class SearchOption {
  public value: string;
  public text: string;
  public index: string;
  public icon: string;

  constructor(index: string, icon: string, value: string, text: string) {
    this.index = index;
    this.icon = icon;
    this.value = value;
    this.text = text;
  }
}
