import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';


@Directive({
  selector: '[ilrSingleImageUpload]',
})

export class SingleImageUploadDirective {
  @Output() uploadImage: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private el: ElementRef
  ) {
    el.nativeElement.style.opacity = 0;
    el.nativeElement.style.position = 'absolute';
    el.nativeElement.style.top = 0;
    el.nativeElement.style.bottom = 0;
    el.nativeElement.style.right = 0;
    el.nativeElement.style.left = 0;
    el.nativeElement.style.backgroundColor = '#000';
    el.nativeElement.style.color = 'white';
    // el.nativeElement.style.borderRadius = '3px';
    // el.nativeElement.style.display = 'flex';
    // el.nativeElement.style.flexDirection = 'column';
    // el.nativeElement.style.alignItems = 'center';
    // el.nativeElement.style.justifyContent = 'center';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.toggle(true);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.toggle(false);
  }

  @HostListener('click') onClick() {
    this.uploadImage.emit(true);
  }

  private toggle(visible: boolean): void {
    if (visible) {
      this.el.nativeElement.style.opacity = 0.64;
    } else {
      this.el.nativeElement.style.opacity = 0;
    }
  }

}
