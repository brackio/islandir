import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../core/alert.service';
import { GlobalErrorHandler as ErrorHandler } from '../../../core/global-error-handler';

import { Business } from '../../shared/business';
import { BusinessService } from '../../shared/business.service';

@Component({
  selector: 'ilr-business-email-edit-dialog',
  templateUrl: './business-email-edit-dialog.component.html',
  styleUrls: ['./business-email-edit-dialog.component.scss']
})
export class BusinessEmailEditDialogComponent {
  public emailForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BusinessEmailEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Business,
    private businessService: BusinessService,
    private alertService: AlertService,
    private errorHandler: ErrorHandler,
    private fb: FormBuilder
  ) {
    this.createForm(data);
  }

  get email() { return this.emailForm.get('email'); }
  set email(val) { this.emailForm.get('email').setValue(val); }

  public save(business: Business): void {
    this.businessService.update(business)
      .then((result) => {
        this.alertService.saveComplete();
        this.dialogRef.close(result);
      }, err => this.errorHandler.handleError(err));
  }

  public cancel(): void {
    this.dialogRef.close(false);
  }

  private createForm(business: Business): void {
    this.emailForm = this.fb.group({
      id: business.id,
      name: business.name,
      email: [business.email, [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    });
  }
}
