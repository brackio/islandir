import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Business } from '../shared/business';

@Component({
  selector: 'ilr-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent implements OnInit {
  public business: Business;

  public navLinks = [
    {
      label: 'overview',
      path: '.',
      options: {exact: true}
    },
    {
      label: 'reviews',
      path: 'reviews',
      options: {exact: true}
    },
    {
      label: 'photos',
      path: 'photos',
      options: {exact: true}
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.parent.data
      .subscribe((data: { business: Business }) => {
        this.business = data.business;
      });
  }

  public editBusiness() {
    this.router.navigate(['edit'], { relativeTo: this.route  });
  }

}
