import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

import { SidenavService } from './shared/sidenav.service';

@Component({
  selector: 'ilr-admin-home',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public isMobileView = false;

  @ViewChild('sidenav') public sidenav: MatSidenav;

  public navLinks: Object[] =
    [

      { name: 'Dashboard', link: '.', icon: 'dashboard', options: { exactLink: true }},
      { name: 'Themes', link: 'themes', icon: 'store', options: { exactLink: false }},
      { name: 'Topics', link: 'topics', icon: 'store', options: { exactLink: false }},
      { name: 'Businesses', link: 'businesses', icon: 'store', options: { exactLink: false }},
      { name: 'Countries', link: 'countries', icon: 'public', options: { exactLink: false }},
      { name: 'Categories', link: 'categories', icon: 'group_work', options: { exactLink: false }},
      { name: 'Services', link: 'services', icon: 'work', options: { exactLink: false }},
      { name: 'Keywords', link: 'keywords', icon: 'list', options: { exactLink: false }}
    ];

  constructor(
    private media: ObservableMedia,
    private sidenavService: SidenavService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
    this.isMobileView = (this.media.isActive('xs') || this.media.isActive('sm'));

    this.media.subscribe((change: MediaChange) => {
      this.isMobileView = (change.mqAlias === 'xs' || change.mqAlias === 'sm');
    });
  }

  public navigateTo(link: string) {
    const country = this.route.snapshot.queryParams['country'];
    const navigationExtras: NavigationExtras = {
      queryParams: {'country': country },
      relativeTo: this.route
    };
    this.router.navigate([link], navigationExtras);
  }
}
