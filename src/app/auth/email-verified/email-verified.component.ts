import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { UserService } from '../../user/shared/user.service';
import { User } from '../../user/shared/user';

@Component({
  selector: 'ilr-email-verified',
  templateUrl: './email-verified.component.html',
})
export class EmailVerifiedComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    const email: string = this.route.snapshot.queryParams['email'];

    if (email) {
      const storedUser: User = this.userService.getStoredUser();

      if (storedUser && (email === storedUser.email) && !storedUser.verified) {
        this.userService.currentUser = storedUser;
        this.userService.markVerified();
        this.userService.saveProfile(this.userService.currentUser);

        const navigationExtras: NavigationExtras = {
          queryParams: { 'ref': 1 }
        };

        this.router.navigate(['/login'], navigationExtras);
        return;
      }
    }
    this.router.navigate(['/login']);
  }
}
