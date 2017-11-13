import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// import { Theme } from '../models/themes/theme';
import { Category } from '../models/categories/category';
// import { Service } from '../models/services/service';
import { Country } from '../models/countries/country';
import { GlobalErrorHandler as ErrorHandler } from '../core/global-error-handler';
import { User } from '../user/shared/user';

import { AuthService } from '../auth/shared/auth.service';
import { UserService } from '../user/shared/user.service';
import { CountryService } from '../models/countries/country.service';
// import { ThemeService } from '../models/themes/theme.service';
import { CategoryService } from '../models/categories/category.service';
// import { ServiceService } from '../models/services/service.service';
import { AlertService } from '../core/alert.service';


// const maxThemeCards = 7;
// const maxTopServices = 7;

@Component({
  selector: 'ilr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public user: User;
  public country: Country;
  public countries: Country[];
  // public theme: Theme;
  public featuredCategories: Category[];
  // public topServices: Service[];
  // private cardsToGet: number;

  constructor(
    public auth: AuthService,
    // private themeService: ThemeService,
    private categoryService: CategoryService,
    private userService: UserService,
    private countryService: CountryService,
    private errorHandler: ErrorHandler,
    // private serviceService: ServiceService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    // this.cardsToGet = maxThemeCards;
    this.user = this.userService.currentUser;
    this.getCountries();
    this.getFeaturedCategories();
    this.route.data
      .subscribe((data: { country: Country }) => {
        this.country = data.country;
        // this.cardsToGet = maxThemeCards;
        // this.getTheme(data.country.code);
      // this.getTopServices(data.country.code, maxTopServices);
    });
  }

  public changeCountry(country: Country): void {
    this.countryService.country = country;
    this.router.navigate(['/', country.code]);
  }

  private getCountries(): void {
    this.countryService.getActive()
      .subscribe(countries => this.countries = countries,
      err => this.errorHandler.handleError(err));
  }

  private getFeaturedCategories(): void {
    this.categoryService.featured()
      .subscribe(categories => this.featuredCategories = categories,
        err => this.errorHandler.handleError(err));
  }

  // private getTheme(country: string): void {
  //   this.themeService.current(country, maxThemeCards)
  //     .subscribe(
  //       theme => this.theme = theme,
  //         // if (this.theme && this.theme.topics) {
  //         //   this.cardsToGet -= this.theme.topics.length;
  //         // }
  //         // if (this.cardsToGet > 0) {
  //         //     this.getTopCategories(country, this.cardsToGet);
  //         // }
  //       err => this.errorHandler.error(err));
  // }

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
