import { Injectable } from '@angular/core';

import { User } from './user';
import { CacheManagerService } from '../../common/services/cache-manager.service';
import { Common } from '../../common/common';
import { CONFIG } from '../../core/config';

@Injectable()
export class UserService {
  private user: User;

  constructor(
    private cache: CacheManagerService
  ) { }

  get currentUser(): User {
    return this.user;
  }

  set currentUser(user: User) {
    this.user = user;
  }

  public markVerified(): void {
    console.log(this.user);
    if (!this.user.verified)
      this.user.verified = true;
  }

  public removeCurrentUser(): void {
    this.user = null;
  }

  public saveProfile(user): void {
    this.cache.set(CONFIG.vars.currentUser, JSON.stringify(user));
  }

  public getStoredUser(): User {
    if (!!this.cache.get(CONFIG.vars.currentUser)) {
      return JSON.parse(this.cache.get(CONFIG.vars.currentUser));
    }

    return null;
  }

  public is24hoursUnverified(): boolean {
    if (this.user.verified) {
      return false;
    }

    return !this.user.verified
      && Common.dateDiff(new Date(), this.user.createdAt) > 0;
  }
}
