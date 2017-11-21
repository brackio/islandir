import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../models/countries/country.service';
import { Country } from '../../models/countries/country';

@Component({
  selector: 'ilr-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.scss']
})
export class NavbarHomeComponent implements OnInit {
  public country: Country;

  constructor(
    private countryService: CountryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { country: Country }) => {
        this.country = data.country;
      });
  }

  public changeCountry(country: Country): void {
    this.countryService.country = country;
    this.router.navigate(['/', country.code]);
  }

}
