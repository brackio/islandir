import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../core/alert.service';
import { GlobalErrorHandler as ErrorHandler } from '../../../core/global-error-handler';

import { Business } from '../../shared/business';
import { BusinessService } from '../../shared/business.service';

@Component({
  selector: 'ilr-business-phone-edit-dialog',
  templateUrl: './business-phone-edit-dialog.component.html',
  styleUrls: ['./business-phone-edit-dialog.component.scss']
})
export class BusinessPhoneEditDialogComponent {
  public phoneForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BusinessPhoneEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Business,
    private businessService: BusinessService,
    private alertService: AlertService,
    private errorHandler: ErrorHandler,
    private fb: FormBuilder
  ) {
    this.createForm(data);
  }

  get phone() { return this.phoneForm.get('phone'); }
  set phone(val) { this.phoneForm.get('phone').setValue(val); }

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
    this.phoneForm = this.fb.group({
      id: business.id,
      name: business.name,
      phone: [business.phone, [Validators.pattern('\\(?([0-9]{3})\\)?([ .-]?)([0-9]{3})\\2([0-9]{4})')]]
    });
  }

}
