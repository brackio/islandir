import { Component, OnInit } from '@angular/core';

import { Notification } from '../../notifications/shared/notification';
import { NotificationService } from '../../notifications/shared/notification.service';
import { AuthService } from '../../auth/shared/auth.service';
import { User } from '../../user/shared/user';
import { AlertService } from '../../core/alert.service';
import { UserService } from '../../user/shared/user.service';

@Component({
  selector: 'ilr-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.scss']
})
export class UserNavComponent implements OnInit {
  public notifications: Notification[];
  public user: User;

  constructor(
    private notificationService: NotificationService,
    private alertService: AlertService,
    private userService: UserService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.user = this.userService.currentUser;
    // if (this.auth.isAuthenticated()) {
    //   this.getRecentNotifications(this.user.id);
    // }
  }

  // public getRecentNotifications(user: string) {
  //   this.notificationService.recentNotifications(user)
  //     .subscribe(
  //       notifications => this.notifications = notifications,
  //       (error : ErrorResponse) => this.alertService.error(error.message));
  // }

}
