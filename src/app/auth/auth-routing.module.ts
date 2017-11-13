import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'email-verified', component: EmailVerifiedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

