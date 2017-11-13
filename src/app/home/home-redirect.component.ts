/**
 * Created by TBaker on 3/8/2017.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CountryService } from '../models/countries/country.service';

@Component({
  selector: 'ilr-home-redirect',
  template: ``
})
export class HomeRedirectComponent implements OnInit {

  constructor(
    private router: Router,
    private countryService: CountryService
  ) { }

  ngOnInit(): void {
    this.router.navigate(['/', this.countryService.country.code]);
  }
}
