import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[ilrImagePlaceholder]'
})

export class ImagePlaceholderDirective {

  constructor(
    private el: ElementRef) {
    el.nativeElement.style.opacity = 0;
    el.nativeElement.style.position = 'absolute';
    el.nativeElement.style.top = 0;
    el.nativeElement.style.bottom = 0;
    el.nativeElement.style.right = 0;
    el.nativeElement.style.left = 0;
    el.nativeElement.style.backgroundColor = '#000';
    el.nativeElement.style.color = '#fff';
    el.nativeElement.style.borderRadius = '3px';
    el.nativeElement.style.display = 'flex';
    el.nativeElement.style.flexDirection = 'column';
    el.nativeElement.style.alignItems = 'center';
    el.nativeElement.style.justifyContent = 'center';
    // el.nativeElement.innerHTML =
    //   `<p class="mat-caption">
    //     <label style="border: none; outline: none; cursor: pointer; display: flex; flex-direction: column;">
    //       <mat-icon class="mat-icon material-icons" style="aligny
    // -self: center;" role="img" aria-hidden="true">add_a_photo</mat-icon>
    //       <input type="file" style="display: none;"
    //        #fileInput ng2FileSelect [uploader]="fileUploader" (change)="fileInput.value=''">Add Photo {{2 + 2}}
    //     </label>
    //   </p>`;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.toggle(true);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.toggle(false);
  }

  private toggle(visible: boolean): void {
    if (visible) {
      this.el.nativeElement.style.opacity = 0.64;
    } else {
      this.el.nativeElement.style.opacity = 0;
    }
  }

}
