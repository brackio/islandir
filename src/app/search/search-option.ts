export class SearchOption {
  public value: string;
  public text: string;
  public index: string;
  public imgSrc: string;
  public image: string;

  constructor(index?: string, imgSrc?: string, image?: string, value?: string, text?: string) {
    this.index = index;
    this.imgSrc = imgSrc;
    this.image = image;
    this.value = value;
    this.text = text;
  }
}
