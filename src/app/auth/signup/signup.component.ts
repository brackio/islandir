import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../user/shared/user';
import { AuthService } from '../shared/auth.service';
import { GlobalErrorHandler as ErrorHandler } from '../../core/global-error-handler';
import { AlertService } from '../../core/alert.service';

@Component({
  selector: 'ilr-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  public email = '';
  public firstname = '';
  public lastname = '';
  public password = '';
  public currentYear: any = new Date().getFullYear();

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandler,
    private router: Router,
    private alertService: AlertService
  ) { }

  public signup (form): void {
    this.auth.signUp(form.firstname, form.lastname, form.email, form.password)
      .then((user: User) => {
          this.router.navigate(['/']);
        },
        err => {
          this.errorHandler.handleError(err);
          this.alertService.error(err.error.message);
        });
  }
}
