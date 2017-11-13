import { Injectable } from '@angular/core';

@Injectable()
export class CacheManagerService {

  constructor() { }


  public get(key: string): string {
    return localStorage.getItem(key);
  }

  public set(key: string, data: string): void {
    localStorage.setItem(key, data);
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clear() {
    localStorage.clear();
  }
}
