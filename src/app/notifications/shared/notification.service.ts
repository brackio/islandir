import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { Notification } from './notification';
import { CONFIG } from '../../core/config';

const notificationsUrl: string = CONFIG.baseUrls.notifications;

@Injectable()
export class NotificationService {

  constructor(private http: HttpClient) { }

  public recentNotifications(user: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${notificationsUrl}/recent/${user}`);
  }

}
