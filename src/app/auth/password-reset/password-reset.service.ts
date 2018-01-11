import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { ErrorHandler } from '../../core/error-handler';

import { CONFIG } from '../../core/config';
const passwordResetUrl = CONFIG.baseUrls.passwordreset;

@Injectable()
export class PasswordResetService {

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandler
  ) { }

  public sendPasswordResetEmail(email: string, redirect: string): Observable<any> {
    return this.http
      .post(`${passwordResetUrl}`, JSON.stringify({ email: email, link: redirect }))
      .pipe(
        catchError(this.errorHandler.error('sendPasswordResetEmail'))
      );
  }

  public verify(token: string): Observable<any>  {
    return this.http
      .get(`${passwordResetUrl}/${token}`)
      .pipe(
        catchError(this.errorHandler.error('verifyToken'))
      );
  }

  public changePassword(token: string, password: string): Observable<any> {
    return this.http
      .put(`${passwordResetUrl}/${token}`, JSON.stringify({ password: password }))
      .pipe(
        catchError(this.errorHandler.error('changePassword'))
      );
  }
}
