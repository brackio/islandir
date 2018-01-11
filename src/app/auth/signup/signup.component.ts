import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../user/shared/user';
import { AuthService } from '../shared/auth.service';

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
    private router: Router
  ) { }

  public signup (form): void {
    this.auth.signUp(form.firstname, form.lastname, form.email, form.password)
      .subscribe((user: User) => this.router.navigate(['/']));
  }
}
