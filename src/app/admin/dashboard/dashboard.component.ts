import { Component, OnInit } from '@angular/core';

import { User } from '../../user/shared/user';
import { UserService } from '../../user/shared/user.service';

@Component({
  selector: 'ilr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public user: User;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.userService.currentUser;
  }

}
