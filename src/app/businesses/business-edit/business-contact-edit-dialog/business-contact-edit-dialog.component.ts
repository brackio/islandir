import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MessageService } from '../../../core/message.service';

import { Business } from '../../shared/business';
import { BusinessService } from '../../shared/business.service';

@Component({
  selector: 'ilr-business-contact-edit-dialog',
  templateUrl: './business-contact-edit-dialog.component.html',
  styleUrls: ['./business-contact-edit-dialog.component.scss']
})
export class BusinessContactEditDialogComponent {
  public contactForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BusinessContactEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Business,
    private businessService: BusinessService,
    private alertService: MessageService,
    private fb: FormBuilder
  ) {
    this.createForm(data);
  }

  get phone() { return this.contactForm.get('phone'); }
  set phone(val) { this.contactForm.get('phone').setValue(val); }
  get email() { return this.contactForm.get('email'); }
  set email(val) { this.contactForm.get('email').setValue(val); }
  get website() { return this.contactForm.get('website'); }
  set website(val) { this.contactForm.get('website').setValue(val); }
  get social(): FormArray { return this.contactForm.get('social') as FormArray; }

  private createForm(business: Business): void {
    this.contactForm = this.fb.group({
      id: business.id,
      name: business.name,
      phone: [business.phone, [Validators.pattern('\\(?([0-9]{3})\\)?([ .-]?)([0-9]{3})\\2([0-9]{4})')]],
      email: [business.email, [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      website: [business.website, [Validators.pattern('https?://.+')]],
      social:  this.fb.array([business.social].map(social =>
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
      .subscribe((result) => {
        this.alertService.saveComplete();
        this.dialogRef.close(result);
      });
  }

  public cancel(): void {
    this.dialogRef.close(false);
  }
}
