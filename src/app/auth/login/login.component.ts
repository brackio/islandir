import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { MessageService } from '../../core/message.service';
import { User } from '../../user/shared/user';

@Component({
  selector: 'ilr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public email = '';
  public password = '';
  public currentYear: any = new Date().getFullYear();
  public reason: string = null;
  public ref: number;

  constructor(
    private auth: AuthService,
    private alertService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.ref = +this.route.snapshot.queryParams['ref'];
    this.reason = this.getReason(this.ref);
  }

  public login(form): void {
    this.auth.login(form.email, form.password)
      .subscribe((user: User) => {
          this.reason = null;
          this.router.navigate(['/']);
          this.alertService.toast(`Logged in as ${user.firstname}`);
        },
      () => {
        this.reason = 'Your email or password is invalid.';
      });
  }

  private getReason(ref: number): string {
    switch (ref) {
      case 0: return 'This account\'s email address is already verified!';
      case 1: return 'Congratulations! You have successfully verified the email address.';
      case 2: this.auth.authClear(); return 'Session expired!';
      default: return null;
    }
  }
}
