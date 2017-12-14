import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSlideToggleChange, MatSelectChange } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { AlertService } from '../../../core/alert.service';
import { GlobalErrorHandler as ErrorHandler } from '../../../core/global-error-handler';

import { Business } from '../../shared/business';
import { BusinessService } from '../../shared/business.service';

@Component({
  selector: 'ilr-business-hours-edit-dialog',
  templateUrl: './business-hours-edit-dialog.component.html',
  styleUrls: ['./business-hours-edit-dialog.component.scss']
})
export class BusinessHoursEditDialogComponent {
  public hoursForm: FormGroup;
  public hours = [
    { value: '00:00',  text: '12:00 am' }, { value: '00:30', text: '12:30 am' },
    { value: '01:00',  text: '01:00 am' }, { value: '01:30', text: '01:30 am' },
    { value: '02:00',  text: '02:00 am' }, { value: '02:30', text: '02:30 am' },
    { value: '03:00',  text: '03:00 am' }, { value: '03:30', text: '03:30 am' },
    { value: '04:00',  text: '04:00 am' }, { value: '04:30', text: '04:30 am' },
    { value: '05:00',  text: '05:00 am' }, { value: '05:30', text: '05:30 am' },
    { value: '06:00',  text: '06:00 am' }, { value: '06:30', text: '06:30 am' },
    { value: '07:00',  text: '07:00 am' }, { value: '07:30', text: '07:30 am' },
    { value: '08:00',  text: '08:00 am' }, { value: '08:30', text: '08:30 am' },
    { value: '09:00',  text: '09:00 am' }, { value: '09:30', text: '09:30 am' },
    { value: '10:00',  text: '10:00 am' }, { value: '10:30', text: '10:30 am' },
    { value: '11:00',  text: '11:00 am' }, { value: '11:30', text: '11:30 am' },
    { value: '12:00',  text: '12:00 pm' }, { value: '12:30', text: '12:30 pm' },
    { value: '13:00',  text: '1:00 pm' }, { value: '13:30', text: '1:30 pm' },
    { value: '14:00',  text: '2:00 pm' }, { value: '14:30', text: '2:30 pm' },
    { value: '15:00',  text: '3:00 pm' }, { value: '15:30', text: '3:30 pm' },
    { value: '16:00',  text: '4:00 pm' }, { value: '16:30', text: '4:30 pm' },
    { value: '17:00',  text: '5:00 pm' }, { value: '17:30', text: '5:30 pm' },
    { value: '18:00',  text: '6:00 pm' }, { value: '18:30', text: '6:30 pm' },
    { value: '19:00',  text: '7:00 pm' }, { value: '19:30', text: '7:30 pm' },
    { value: '20:00',  text: '8:00 pm' }, { value: '20:30', text: '8:30 pm' },
    { value: '21:00',  text: '9:00 pm' }, { value: '21:30', text: '9:30 pm' },
    { value: '22:00',  text: '10:00 pm' }, { value: '22:30', text: '10:30 pm' },
    { value: '23:00',  text: '11:00 pm' }, { value: '23:30', text: '11:30 pm' }
  ];

  // @ViewChild(MatMenuTrigger) hourTrigger: MatMenuTrigger;
  // public currentControl: FormControl;

  constructor(
    public dialogRef: MatDialogRef<BusinessHoursEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Business,
    private businessService: BusinessService,
    private alertService: AlertService,
    private errorHandler: ErrorHandler,
    private fb: FormBuilder
  ) {
    this.createForm(data);
  }

  get sundayHours(): FormArray { return this.hoursForm.get('openingHours.sunday') as FormArray;  }
  get mondayHours(): FormArray { return this.hoursForm.get('openingHours.monday') as FormArray;  }
  get tuesdayHours(): FormArray { return this.hoursForm.get('openingHours.tuesday') as FormArray;  }
  get wednesdayHours(): FormArray { return this.hoursForm.get('openingHours.wednesday') as FormArray;  }
  get thursdayHours(): FormArray { return this.hoursForm.get('openingHours.thursday') as FormArray;  }
  get fridayHours(): FormArray { return this.hoursForm.get('openingHours.friday') as FormArray;  }
  get saturdayHours(): FormArray { return this.hoursForm.get('openingHours.saturday') as FormArray;  }

  private createForm(business: Business): void {
    this.hoursForm = this.fb.group({
      id: business.id,
      name: business.name,
      openingHours: this.fb.group({
        sunday: this.fb.array(business.openingHours.sunday.map(hour =>
          this.fb.group({
            opens: [hour.opens, Validators.required],
            closes: [hour.closes, Validators.required]
          }))),
        monday: this.fb.array(business.openingHours.monday.map(hour =>
          this.fb.group({
            opens: [hour.opens, Validators.required],
            closes: [hour.closes, Validators.required]
          }))),
        tuesday: this.fb.array(business.openingHours.tuesday.map(hour =>
          this.fb.group({
            opens: [hour.opens, Validators.required],
            closes: [hour.closes, Validators.required]
          }))),
        wednesday: this.fb.array(business.openingHours.wednesday.map(hour =>
          this.fb.group({
            opens: [hour.opens, Validators.required],
            closes: [hour.closes, Validators.required]
          }))),
        thursday: this.fb.array(business.openingHours.thursday.map(hour =>
          this.fb.group({
            opens: [hour.opens, Validators.required],
            closes: [hour.closes, Validators.required]
          }))),
        friday: this.fb.array(business.openingHours.friday.map(hour =>
          this.fb.group({
            opens: [hour.opens, Validators.required],
            closes: [hour.closes, Validators.required]
          }))),
        saturday: this.fb.array(business.openingHours.saturday.map(hour =>
          this.fb.group({
            opens: [hour.opens, Validators.required],
            closes: [hour.closes, Validators.required]
          })))
      })
    });
  }

  public addHour(ctrl: FormArray): void {
    ctrl.push(this.fb.group({
      opens: ['', Validators.required],
      closes: ['', Validators.required]
    }));
  }

  public removeHour(index: number, ctrl: FormArray): void {
    ctrl.removeAt(index);
  }

  public toggleHours(event: MatSlideToggleChange, ctrl: FormArray): void {
    if (event.checked === true && !ctrl.length) {
      this.addHour(ctrl);
    }

    if (event.checked === false) {
      while (0 !== ctrl.length) {
        ctrl.removeAt(0);
      }
    }
  }
  //
  // public openHourMenu(): void  {
  //   this.hourTrigger.openMenu();
  // }
  //
  // public currentCtrl(ctrl: FormControl): void {
  //   this.currentControl = ctrl;
  // }
  //
  // public setHour(hour: string) {
  //   this.currentControl.setValue(hour);
  // }

  public hourSelected(event: MatSelectChange): void {
    console.log(event);

  }

  public hasHours(ctrl: FormArray, count?: number): boolean {
    console.log(ctrl && ctrl.length > count || 0);
    if (ctrl && ctrl.length > count || 0) {
      return true;
    }
    return false;
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
