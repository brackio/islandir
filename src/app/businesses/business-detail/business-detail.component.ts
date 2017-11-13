import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Business } from '../shared/business';
import { BusinessService } from '../shared/business.service';
import { AlertService } from '../../core/alert.service';

@Component({
  selector: 'ilr-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent implements OnInit {
  public business: Business;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private businessService: BusinessService,
  ) { }

  ngOnInit() {
    this.route.parent.data
      .subscribe((data: { business: Business }) => {
        this.business = data.business;
        console.log(this.business);
      });
  }

  public editBusiness() {
    this.router.navigate(['edit'], { relativeTo: this.route  });
  }

}
