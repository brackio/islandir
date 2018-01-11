import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ilrSearchFocus]'
})

export class SearchFocusDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('focus', ['$event.target']) onFocus(target) {
    this.renderer.addClass(target.parentElement, 'active');
  }

  @HostListener('blur', ['$event.target']) onBlur(target) {
    this.renderer.removeClass(target.parentElement, 'active');

  }
}
