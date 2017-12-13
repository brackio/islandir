import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { AlertService } from '../../../core/alert.service';
import { GlobalErrorHandler as ErrorHandler } from '../../../core/global-error-handler';

import { Business } from '../../shared/business';
import { BusinessService } from '../../shared/business.service';

@Component({
  selector: 'ilr-business-social-edit-dialog',
  templateUrl: './business-social-edit-dialog.component.html',
  styleUrls: ['./business-social-edit-dialog.component.scss']
})
export class BusinessSocialEditDialogComponent {
  public socialForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BusinessSocialEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Business,
    private businessService: BusinessService,
    private alertService: AlertService,
    private errorHandler: ErrorHandler,
    private fb: FormBuilder
  ) {
    this.createForm(data);
  }

  get website() { return this.socialForm.get('website'); }
  set website(val) { this.socialForm.get('website').setValue(val); }
  get social(): FormArray { return this.socialForm.get('social') as FormArray; }

  private createForm(business: Business): void {
    this.socialForm = this.fb.group({
      id: business.id,
      name: business.name,
      website: [business.website, [Validators.pattern('https?://.+')]],
      social:  this.fb.array(['', '', '', '', '', '', '', '', '', '', '',''].map(social =>
        this.fb.control(social), Validators.pattern('https?://.+')))
    });
  }

  public addSocial(): void {
    this.social.push(new FormControl());
  }

  public removeSocial(index: number): void {
    this.social.removeAt(index);
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
