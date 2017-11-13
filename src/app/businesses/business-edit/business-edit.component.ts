import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

import { Business } from '../shared/business';

@Component({
  selector: 'ilr-business-edit',
  templateUrl: './business-edit.component.html',
  styleUrls: ['./business-edit.component.scss']
})
export class BusinessEditComponent implements OnInit {
  public business: Business;
  public isMobileView = false;

  constructor(
    private media: ObservableMedia,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.parent.data
      .subscribe((data: { business: Business }) => {
        this.business = data.business;
      });

    this.isMobileView = (this.media.isActive('xs') || this.media.isActive('sm'));
    this.media.subscribe((change: MediaChange) => {
      this.isMobileView = (change.mqAlias === 'xs' || change.mqAlias === 'sm');
    });
  }


}
