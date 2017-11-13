import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { User } from '../../user/shared/user';
import { PasswordResetService } from './password-reset.service';
import { AlertService } from '../../core/alert.service';
import { GlobalErrorHandler as ErrorHandler } from '../../core/global-error-handler';
import { CONFIG } from '../../core/config';

@Component({
  selector: 'ilr-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public passwordResetEmailForm: FormGroup;

  public tokenIsValid = false;
  public user: User = new User();
  private token: string;
  public errorMessage: string;
  public successMessage: string;

  constructor(
    private route: ActivatedRoute,
    private passwordResetService: PasswordResetService,
    private alertService: AlertService,
    private errorHandler: ErrorHandler,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initChangePasswordForm();
    this.initPasswordResetEmailForm();

    const token: string = this.route.snapshot.queryParams['token'];
    if (token) {
      this.verifyResetToken(token);
    } else {
      this.tokenIsValid = false;
    }
  }

  public sentEmail(form): void {
    this.passwordResetService.sendPasswordResetEmail(form.email, `${CONFIG.appUrl}/password-reset`)
      .subscribe((result) => {
          if (result) {
            this.successMessage = PasswordResetComponent.emailSentSuccess();
            this.errorMessage = null;
          }
        },
        err => this.errorHandler.handleError(err));
  }

  public changePassword(form): void {
    this.passwordResetService.changePassword(this.token, form.password)
      .subscribe(result => {
          if (result) {
            this.successMessage = PasswordResetComponent.changePasswordSuccess();
            this.errorMessage = null;
          }
        },
        err => this.errorHandler.handleError(err));
  }

  private verifyResetToken(token: string): void {
    this.passwordResetService.verify(token)
      .then(result => {
          if (result && result.token && result.user) {
            this.token = result.token;
            this.user = result.user;
            this.tokenIsValid = true;
          } else {
            this.tokenIsValid = false;
            this.errorMessage = PasswordResetComponent.invalidTokenError();
          }
        },
        (res: any) => {
          // this.alertService.openAlert(error.message, error.title);
          this.tokenIsValid = false;
          this.errorMessage = PasswordResetComponent.invalidTokenError();
        });
  }

  private static changePasswordSuccess(): string {
    return 'Your password was changed. You can now sign in using your new password.';
  }

  private static emailSentSuccess(): string {
    return 'Check your email for a link to reset your password. If it doesn\'t appear within a few minutes, check your spam folder.';
  }

  private static invalidTokenError(): string {
    return 'It looks like you clicked on an invalid password reset link. Please try again.';
  }

  private initChangePasswordForm(): void {
    this.changePasswordForm = this.fb.group({
      password: ['', [ Validators.required, Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&.]{6,}/) ]],
      confirmPassword: ['', [ Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&.]{6,}/) ]]
    }, { validator: this.passwordMatcher });
  }

  private initPasswordResetEmailForm(): void {
    this.passwordResetEmailForm = this.fb.group({
      email: ['', [ Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]]
    });
  }

  private passwordMatcher(c: AbstractControl) {
    const passwordControl = c.get('password');
    const confirmControl = c.get('confirmPassword');
    if (passwordControl.pristine || confirmControl.pristine) {
      return null;
    }
    if (passwordControl.value === confirmControl.value) {
      return null;
    }
    return { 'match': true };
  }



}
