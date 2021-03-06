import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../../core/message.service';

import { Business } from '../../shared/business';
import { BusinessService } from '../../shared/business.service';
import { CONFIG } from '../../../core/config';

@Component({
  selector: 'ilr-business-description-edit-dialog',
  templateUrl: './business-description-edit-dialog.component.html',
  styleUrls: ['./business-description-edit-dialog.component.scss']
})
export class BusinessDescriptionEditDialogComponent {
  public descriptionForm: FormGroup;
  public descriptionCharLength: number = CONFIG.descriptionLength;

  constructor(
    public dialogRef: MatDialogRef<BusinessDescriptionEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Business,
    private businessService: BusinessService,
    private alertService: MessageService,
    private fb: FormBuilder
  ) {
    this.createForm(data);
  }

  get description() { return this.descriptionForm.get('description'); }

  private createForm(business: Business): void {
    this.descriptionForm = this.fb.group({
      id: business.id,
      name: business.name,
      description: [business.description, [Validators.maxLength(this.descriptionCharLength)]]
    });
  }

  public save(business: Business): void {
    this.businessService.update(business)
      .subscribe((result) => {
        this.alertService.saveComplete();
        this.dialogRef.close(result);
      });
  }

  public cancel(): void {
    this.dialogRef.close(false);
  }
}
