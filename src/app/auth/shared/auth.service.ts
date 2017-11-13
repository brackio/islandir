import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { User } from '../../user/shared/user';
import { UserService } from '../../user/shared/user.service';
import { CacheManagerService as Cache} from '../../core/cache-manager.service';

import { CONFIG } from '../../core/config';

const usersUrl = CONFIG.baseUrls.users;
const authUrl = CONFIG.baseUrls.auth;

@Injectable()
export class AuthService {
  // public userProfile: User;
  public redirectUrl: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private cache: Cache,
  ) {

    this.userService.currentUser = this.userService.getStoredUser();
  }

  public isAuthenticated(): boolean {
    return !!this.cache.get(CONFIG.vars.currentUser) && !this.tokenExpired();
  }

  public login(email: string, password: string): Promise<User> {
    return this.http
      .post<User>(authUrl,
        null,
        {
          headers: new HttpHeaders()
            .set('Authorization', 'Basic ' + btoa(email + ':' + password))
            .set('Content-Type', 'application/x-www-form-urlencoded')
        })
      .map((response: any) => {
       const token = response && response.token;
        if (token) {
          this.setToken(token);
          this.userService.saveProfile(response.user);
          this.userService.currentUser = response.user;
          return this.userService.currentUser;
        }
      }).toPromise();
  }

  public signUp(firstname: string, lastname: string, email: string, password: string): Promise<User> {
    return this.http
      .post<User>(usersUrl, JSON.stringify(
        {
          firstname: firstname.charAt(0).toUpperCase() + firstname.slice(1),
          lastname: lastname.charAt(0).toUpperCase() + lastname.slice(1),
          email: email,
          password: password
        }), {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        }).map((response: any) => {
          const token = response && response.token;
          if (token) {
            this.setToken(token);
            this.userService.saveProfile(response.user);
            this.userService.currentUser = response.user;
            return this.userService.currentUser;
          }
      }).toPromise();
  }

  public logout(): void {
    // clear token remove user from local storage to log user out
    this.authClear();
    this.router.navigate(['/login']);
  }

  public sendEmailVerification(email: string): Promise<any> {
    return this.http
      .post(`${authUrl}/resend-verify-email`, JSON.stringify({ email: email }))
      .toPromise();
  }

  public isAdmin(): boolean {
    return this.userService.currentUser
      && this.userService.currentUser.roles
      && this.userService.currentUser.roles.indexOf('admin') > -1;
  }

  public tokenExpired(): boolean {
    const token = JSON.parse(this.cache.get(CONFIG.vars.currentToken));
    if (!!token) {
      return token.expired;
    }
    return false;
  }

  private setToken(token: string): void {
    const authToken = {
      token: token,
      expired: false
    };
    this.cache.set(CONFIG.vars.currentToken, JSON.stringify(authToken));
  }

  public authClear(): void {
    console.log('clearing cache');
    this.userService.removeCurrentUser();
    this.cache.removeItem(CONFIG.vars.currentUser);
    this.cache.removeItem(CONFIG.vars.currentToken);
  }


}
