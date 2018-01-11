import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

import { AuthService } from './shared/auth.service';
import { PasswordResetService } from './password-reset/password-reset.service';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    EmailVerifiedComponent,
    PasswordResetComponent
  ],
  providers: [
    AuthService,
    PasswordResetService
  ]
})
export class AuthModule { }
