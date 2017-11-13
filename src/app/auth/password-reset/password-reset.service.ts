import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { CONFIG } from '../../core/config';
const passwordResetUrl = CONFIG.baseUrls.passwordreset;

@Injectable()
export class PasswordResetService {

  constructor(
    private http: HttpClient
  ) { }

  public sendPasswordResetEmail(email: string, redirect: string): Observable<any> {
    return this.http.post(`${passwordResetUrl}`, JSON.stringify({ email: email, link: redirect }));
  }

  public verify(token: string): Promise<any>  {
    return this.http
      .get(`${passwordResetUrl}/${token}`)
      .toPromise();
  }

  public changePassword(token: string, password: string): Observable<any> {
    return this.http
      .put(`${passwordResetUrl}/${token}`, JSON.stringify({ password: password }));
  }
}
