import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'ilr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private iconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon( 'islandir-light', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/islandir-light.svg'));
    this.iconRegistry.addSvgIcon( 'islandir-dark', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/islandir-dark.svg'));

    this.iconRegistry.addSvgIcon( 'animals', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/animals.svg'));
    this.iconRegistry.addSvgIcon( 'automotive', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/automotive.svg'));
    this.iconRegistry.addSvgIcon( 'beauty-spa', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/beauty-spa.svg'));
    this.iconRegistry.addSvgIcon( 'child-care', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/child-care.svg'));
    this.iconRegistry.addSvgIcon( 'religious', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/religious.svg'));
    this.iconRegistry.addSvgIcon( 'emergency-services', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/emergency-services.svg'));
    this.iconRegistry.addSvgIcon( 'event-planning', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/event-planning.svg'));
    this.iconRegistry.addSvgIcon( 'home-services', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/home-services.svg'));
    this.iconRegistry.addSvgIcon( 'government', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/government.svg'));
    this.iconRegistry.addSvgIcon( 'legal-services', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/legal-services.svg'));
    this.iconRegistry.addSvgIcon( 'real-estate', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/real-estate.svg'));
    this.iconRegistry.addSvgIcon( 'medical-services', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/medical-services.svg'));
    this.iconRegistry.addSvgIcon( 'recycling', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/recycling.svg'));
    this.iconRegistry.addSvgIcon( 'sports', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/sports.svg'));
    this.iconRegistry.addSvgIcon( 'storage', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/storage.svg'));
    this.iconRegistry.addSvgIcon( 'store', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/store.svg'));
    this.iconRegistry.addSvgIcon( 'shopping', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/shopping.svg'));
    this.iconRegistry.addSvgIcon( 'media', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/media.svg'));
    this.iconRegistry.addSvgIcon( 'restaurant', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/restaurant.svg'));
    this.iconRegistry.addSvgIcon( 'professional-services', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/professional-services.svg'));
    this.iconRegistry.addSvgIcon( 'nightlife', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/nightlife.svg'));
    this.iconRegistry.addSvgIcon( 'internet-cafe', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/internet-cafe.svg'));
    this.iconRegistry.addSvgIcon( 'library', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/library.svg'));
    this.iconRegistry.addSvgIcon( 'laundry', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/laundry.svg'));
    this.iconRegistry.addSvgIcon( 'hotels', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/hotels.svg'));
    this.iconRegistry.addSvgIcon( 'financial-services', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/financial-services.svg'));
    this.iconRegistry.addSvgIcon( 'education', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/education.svg'));
    this.iconRegistry.addSvgIcon( 'entertainment', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/entertainment.svg'));
    this.iconRegistry.addSvgIcon( 'more-dots', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/more-dots.svg'));
    this.iconRegistry.addSvgIcon( 'analytics', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/analytics.svg'));
    this.iconRegistry.addSvgIcon( 'chat', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/chat.svg'));
    this.iconRegistry.addSvgIcon( 'list-business', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/list-business.svg'));
    this.iconRegistry.addSvgIcon( 'facebook', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook.svg'));
    this.iconRegistry.addSvgIcon( 'twitter', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/twitter.svg'));
    this.iconRegistry.addSvgIcon( 'google-plus', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/google-plus.svg'));
    this.iconRegistry.addSvgIcon( 'make-money', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/make-money.svg'));
  }
}
