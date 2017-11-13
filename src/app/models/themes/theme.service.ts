import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { DataAccess } from '../data-access';
import { Theme } from './theme';
import { CONFIG } from '../../core/config';
import { CategoryService } from '../categories/category.service';
import { Category } from '../categories/category';

const themesUrl: string = CONFIG.baseUrls.themes;

@Injectable()
export class ThemeService extends DataAccess<Theme> {
  constructor(
    private http: HttpClient,
    private categoryService: CategoryService,
  ) {
    super();
    this.baseUrl = CONFIG.baseUrls.categories;
  }

  // public currentTheme(country: string): Observable<Theme> {
  //   return this.http.get(`${themesUrl}/now/${country}`)
  //     .map(res => this.extractDataService.extractData<Theme>(res))
  //     .catch(this.exceptionService.catchBadResponse);
  // }

  get(page: number, limit: number, sort: string, sortOrder?: string, fields?: string[]): Observable<HttpResponse<Theme[]>> {
    return undefined;
  }

  create(item: Theme): Promise<Theme> {
    return undefined;
  }

  remove(id: string): Promise<Theme> {
    return undefined;
  }

  update(item: Theme): Promise<Theme> {
    return undefined;
  }

  findOne(id: string): Promise<Theme> {
    return undefined;
  }

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

