import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from '../models/categories/category';
import { Country } from '../models/countries/country';
import { User } from '../user/shared/user';
import { Theme } from '../models/themes/theme';
import { Topic } from '../models/topics/topic';

import { AuthService } from '../auth/shared/auth.service';
import { UserService } from '../user/shared/user.service';
import { CountryService } from '../models/countries/country.service';
import { CategoryService } from '../models/categories/category.service';
import { GeolocatorService } from '../common/services/geolocator.service';
import { ThemeService } from '../models/themes/theme.service';

@Component({
  selector: 'ilr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public user: User;
  public theme: Theme;
  public topic: Topic;
  public country: Country;
  public countries: Country[];
  public redirectCountry: Country = new Country();
  public featuredCategories: Category[];
  public showRedirectPanel: boolean = false;
  public currentYear: any = new Date().getFullYear();
  public themeStyles: {};

  constructor(
    public auth: AuthService,
    private categoryService: CategoryService,
    private userService: UserService,
    private themeService: ThemeService,
    private route: ActivatedRoute,
    private countryService: CountryService,
    private geolocatorService: GeolocatorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { country: Country }) => {
        this.country = data.country;
        this.getTheme(data.country.code);
      });

    this.user = this.userService.currentUser;
    this.getFeaturedCategories();
    this.getCountries();
  }

  public setThemeStyle(theme: Theme): void {
    this.themeStyles = {
      'background-image': `linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.5)
      ), url(${theme.topics[0].image.url})`,
      'background-position': `${theme.topics[0].image.styles.backgroundPosition}`
    };
  }

  public changeCountry(country: Country): void {
    this.countryService.country = country;
    this.router.navigate(['/', country.code]);
  }

  public tagSelected(tag: string): void {
    this.router.navigate(['/business/search', { q: tag.toLowerCase(), country: this.countryService.country.code }]);
  }

  private getCountries(): void {
    this.countryService.getActive(['-id', 'code', 'name'])
      .subscribe((countries: Country[]) => {
        this.countries = countries;
        this.locateUser(countries);
      });
  }

  private locateUser(countries): void {
    this.geolocatorService.locate((err, location) => {
      if (err) {
        console.log(err);
      } else {
        if (location.address) {
          this.redirectCountry.id = null;
          this.redirectCountry.code = location.address.countryCode.toLowerCase();
          this.redirectCountry.name = location.address.country;
          if (this.country.code !== this.redirectCountry.code
            && this.countries.filter(c => c.code === this.redirectCountry.code).length > 0) {
            this.showRedirectPanel = true;
          }
        }
      }
    });
  }

  private getFeaturedCategories(): void {
    this.categoryService.featured()
      .subscribe(categories => this.featuredCategories = categories);
  }

  private getTheme(country: string): void {
    this.themeService.current(country)
      .subscribe(theme => {
        this.theme = theme;
        if (!!theme) {
          this.setThemeStyle(theme);
        }
      });
  }

  // private getTopCategories(country: string, limit: number): void {
  //   this.categoryService.topCategories(country, limit)
  //     .subscribe(
  //       categories => {
  //         this.topCategories = categories;
  //         this.cardsToGet -= this.topCategories.length;
  //         if (this.cardsToGet > 0) {
  //           const exclusion = [];
  //           this.topCategories.forEach((category: any) => {
  //             exclusion.push(category.category._id);
  //           });
  //           this.getCategories(this.cardsToGet, exclusion);
  //         }
  //       },
  //       error => this.snackBarService.errorMessage(Error.LIST));
  // }
  //
  // private getCategories(limit: number, exclude: string[]): void {
  //   this.categoryService.getCategories(limit, exclude)
  //     .subscribe(
  //       categories =>  this.categories = categories,
  //       error => this.snackBarService.errorMessage(Error.LIST));
  // }

  // private getTopServices(country: string, limit: number): void {
  //   this.serviceService.getPopular(country, limit)
  //     .subscribe(
  //       services => this.topServices = services,
  //       (error : ErrorResponse) => this.alertService.error(error.message));
  // }
}
