import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { DataAccess } from '../data-access';
import { Theme } from './theme';
import { CONFIG } from '../../core/config';
import { ErrorHandler } from '../../core/error-handler';
import { Paging } from '../../core/paging';

@Injectable()
export class ThemeService extends DataAccess<Theme> {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandler
  ) {
    super();
    this.baseUrl = CONFIG.baseUrls.themes;
  }

  public get(page: number,
             limit: number,
             sort: string,
             sortOrder?: string,
             fields?: string[]): Observable<HttpResponse<Theme[]>> {
    const paging = Paging.paginate(page, limit);
    return this.http.get<Theme[]>(`${this.baseUrl}`,
      {
        observe: 'response',
        params: new HttpParams()
          .set('page', `${paging.page}`)
          .set('skip', `${paging.skip}`)
          .set('limit', `${paging.limit}`)
          .set('sort', (sortOrder === 'asc' ? '' : '-')  + `${sort}`)
          .set('fields', fields.join())
      })
      .pipe(
        catchError(this.errorHandler.error<HttpResponse<Theme[]>>('getPagedThemes'))
      );
  }

  public create(theme: Theme): Observable<Theme> {
    const body = JSON.stringify(theme);
    return this.http
      .post<Theme>(`${this.baseUrl}`, body)
      .pipe(
        catchError(this.errorHandler.error<Theme>('createTheme'))
      );
  }

  public remove(theme: Theme | string): Observable<any> {
    const id = typeof theme === 'string' ? theme : theme.id;
    return this.http
      .delete<Theme>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.errorHandler.error<Theme>('deleteTheme'))
      );
  }

  public update(theme: Theme): Observable<Theme> {
    const body = JSON.stringify(theme);
    return this.http
      .put<Theme>(`${this.baseUrl}/${theme.id}`, body)
      .pipe(
        catchError(this.errorHandler.error<Theme>(`updateTheme`))
      );
  }

  public findOne(id: string): Observable<Theme> {
    return this.http
      .get<Theme>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.errorHandler.error<Theme>(`getTheme id=${id}`))
      );
  }

  public current(country: string): Observable<Theme> {
    return this.http
      .get<Theme>(`${this.baseUrl}/now/${country}`)
      .pipe(
        catchError(this.errorHandler.error<Theme>('getCurrentTheme'))
      );
  }

  // public current(country: string, maxCards?: number): Observable<Theme> {
  //   const cardsToGet: number = maxCards || 7;
  //   return this.http.get<Theme>(`${this.baseUrl}/now/${country}`);
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
  // }

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

