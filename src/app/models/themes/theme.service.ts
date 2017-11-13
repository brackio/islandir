import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

import { Theme } from './theme';
import { CONFIG } from '../../core/config';
import { CategoryService } from '../categories/category.service';
import { Category } from '../categories/category';

const themesUrl: string = CONFIG.baseUrls.themes;
const categoriesUrl: string = CONFIG.baseUrls.categories;

@Injectable()
export class ThemeService {

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService,
  ) { }

  // public currentTheme(country: string): Observable<Theme> {
  //   return this.http.get(`${themesUrl}/now/${country}`)
  //     .map(res => this.extractDataService.extractData<Theme>(res))
  //     .catch(this.exceptionService.catchBadResponse);
  // }

  public current(country: string, maxCards?: number): Observable<Theme> {
    const cardsToGet: number = maxCards || 7;
    return this.http.get<Theme>(`${themesUrl}/now/${country}`);
      // .map((res: any) => res.json())
      // .flatMap((theme: Theme) => {
      //   if (theme && theme.topics) {
      //     cardsToGet -= theme.topics.length;
      //   } else {
      //     theme = new Theme();
      //   }
      //   if (cardsToGet >= 0) {
      //     return this.categoryService.getPopular(country, cardsToGet)
      //       .flatMap((popularCategories: Category[]) => {
      //         if (popularCategories) {
      //           theme.categories = popularCategories;
      //         }
      //         cardsToGet -= popularCategories.length;
      //         if (cardsToGet >= 0) {
      //           const exclusion = [];
      //           popularCategories.forEach((category: any) => {
      //             exclusion.push(category.category.id);
      //           });
      //           return this.categoryService.get(cardsToGet, exclusion)
      //             .flatMap((categories: Category[]) => {
      //               //const concat = _.concat(theme.categories, categories);
      //               theme.categories = _.concat(theme.categories, categories);
      //               return Observable.of(theme);
      //             });
      //         } else {
      //           return Observable.of(theme);
      //         }
      //       });
      //   }
      //   return Observable.of(theme);
      // });
  }

  // public current(country: string, maxCards?: number): Observable<Theme> {
  //   let cardsToGet: number = maxCards || 7;
  //   return this.http.get(`${themesUrl}/now/${country}`)
  //     .map((res: any) => res.json())
  //     .flatMap((theme: Theme) => {
  //       if (theme && theme.topics) {
  //         cardsToGet -= theme.topics.length;
  //       } else {
  //         theme = new Theme();
  //       }
  //       if (cardsToGet >= 0) {
  //         return this.categoryService.getPopular(country, cardsToGet)
  //           .flatMap((popularCategories: Category[]) => {
  //             if (popularCategories) {
  //               theme.categories = popularCategories;
  //             }
  //             cardsToGet -= popularCategories.length;
  //             if (cardsToGet >= 0) {
  //               const exclusion = [];
  //               popularCategories.forEach((category: any) => {
  //                 exclusion.push(category.category.id);
  //               });
  //               return this.categoryService.get(cardsToGet, exclusion)
  //                 .flatMap((categories: Category[]) => {
  //                   //const concat = _.concat(theme.categories, categories);
  //                   theme.categories = _.concat(theme.categories, categories);
  //                   return Observable.of(theme);
  //                 });
  //             } else {
  //               return Observable.of(theme);
  //             }
  //           });
  //       } else {
  //         return Observable.of(theme);
  //       }
  //     });
  // }

}

