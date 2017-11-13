import { Component, OnInit } from '@angular/core';

import { User } from '../user/shared/user';
import { UserService } from '../user/shared/user.service';
import { AuthService } from '../auth/shared/auth.service';


@Component({
  selector: 'ilr-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.scss']
})
export class AccountLoginComponent implements OnInit {
  public user: User;

  constructor(
    public auth: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.userService.currentUser;
  }

}
