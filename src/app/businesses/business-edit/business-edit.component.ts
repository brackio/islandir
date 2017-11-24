import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Business } from '../shared/business';
import { AlertService } from '../../core/alert.service';
import { GlobalErrorHandler as ErrorHandler } from '../../core/global-error-handler';


@Component({
  selector: 'ilr-business-edit',
  templateUrl: './business-edit.component.html',
  styleUrls: ['./business-edit.component.scss']
})
export class BusinessEditComponent implements OnInit {
  public business: Business;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.parent.data
      .subscribe((data: { business: Business }) => {
        this.business = data.business;

      });
  }

}
