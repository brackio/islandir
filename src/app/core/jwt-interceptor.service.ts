///<reference path="../../../node_modules/@angular/common/http/src/response.d.ts"/>
import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { CONFIG } from './config';
@Injectable()
export class JWTInterceptor  implements HttpInterceptor {

  constructor(
    private router: Router
  ){ }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = localStorage.getItem(CONFIG.vars.currentToken);
      if (!!token) {
        const JWT = `Bearer ${JSON.parse(token).token}`;
        // Clone the request to add the new header.
        req = req.clone({
          headers: req.headers
            .set('Authorization', JWT)
            .set('Content-Type', 'application/json')
        });
      }
      return next.handle(req).do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
        }
      })
      .catch(err => {
        if (err instanceof HttpErrorResponse) {
          // console.log('error', err);
          if (err.error.code === 401 && (err.error.type === 'TokenExpiredException' || err.error.type === 'UnauthorizedException')) {
          // JWT expired, go to login
          const extras: NavigationExtras = {
            queryParams: { 'ref': 2 }
          };
          this.router.navigate(['login'], extras);
          }
        }
        return Observable.throw(err);
      });
    }


}






