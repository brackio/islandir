import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../core/alert.service';
import { GlobalErrorHandler as ErrorHandler } from '../../../core/global-error-handler';

import { Business } from '../../shared/business';
import { BusinessService } from '../../shared/business.service';

@Component({
  selector: 'ilr-business-name-edit-dialog',
  templateUrl: './business-name-edit-dialog.component.html',
  styleUrls: ['./business-name-edit-dialog.component.scss']
})
export class BusinessNameEditDialogComponent {
  public nameForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BusinessNameEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Business,
    private businessService: BusinessService,
    private alertService: AlertService,
    private errorHandler: ErrorHandler,
    private fb: FormBuilder
  ) {
    this.createForm(data);
  }

  get name() { return this.nameForm.get('name'); }
  set name(val) { this.nameForm.get('name').setValue(val); }

  private createForm(business: Business): void {
    this.nameForm = this.fb.group({
      id: business.id,
      name: [business.name,
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(2),
        ]]
    });
  }

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
}
