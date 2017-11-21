import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[ilrImageUpload]'
})
export class ImageUploadDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.toggle(true);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.toggle(false);
  }

  private toggle(visible: boolean): void {
    if (visible) {
      this.el.nativeElement.style.opacity = 1;
    } else {
      this.el.nativeElement.style.opacity = 0;
    }
  }

}
