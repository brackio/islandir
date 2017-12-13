import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Business } from '../shared/business';
import { BusinessNameEditDialogComponent } from './business-name-edit-dialog/business-name-edit-dialog.component';
import { BusinessLocationEditDialogComponent } from './business-location-edit-dialog/business-location-edit-dialog.component';
import { BusinessPhoneEditDialogComponent } from './business-phone-edit-dialog/business-phone-edit-dialog.component';
import { BusinessEmailEditDialogComponent } from './business-email-edit-dialog/business-email-edit-dialog.component';
import { BusinessServicesEditDialogComponent } from './business-services-edit-dialog/business-services-edit-dialog.component';
import { BusinessSocialEditDialogComponent } from './business-social-edit-dialog/business-social-edit-dialog.component';
import { BusinessDescriptionEditDialogComponent } from './business-description-edit-dialog/business-description-edit-dialog.component';
import { BusinessHoursEditDialogComponent } from './business-hours-edit-dialog/business-hours-edit-dialog.component';

@Component({
  selector: 'ilr-business-edit',
  templateUrl: './business-edit.component.html',
  styleUrls: ['./business-edit.component.scss']
})
export class BusinessEditComponent implements OnInit {
  public business: Business;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.parent.data
      .subscribe((data: { business: Business }) => {
        this.business = data.business;
      });
  }

  public openDialog(dialogName: string) {
    let dialogRef = this.dialog.open(this.getDialogComponent(dialogName), {
      width: '624px',
      disableClose: true,
      data: this.business
    });

    dialogRef.afterClosed().subscribe((result: Business) => {
      if (!!result) {
        this.business = result;
      }
      dialogRef = null;
    });
  }

  public hasOpeningHours(): boolean {
    if (this.business.openingHours.sunday.length ||
        this.business.openingHours.monday.length ||
        this.business.openingHours.tuesday.length ||
        this.business.openingHours.wednesday.length ||
        this.business.openingHours.thursday.length ||
        this.business.openingHours.friday.length ||
        this.business.openingHours.saturday.length) {
      return true;
    }
    return false;
  }

  private getDialogComponent(name: string): any {
    switch (name) {
      case 'name': return BusinessNameEditDialogComponent;
      case 'location': return BusinessLocationEditDialogComponent;
      case 'phone': return BusinessPhoneEditDialogComponent;
      case 'email': return BusinessEmailEditDialogComponent;
      case 'services': return BusinessServicesEditDialogComponent;
      case 'social': return BusinessSocialEditDialogComponent;
      case 'hours': return BusinessHoursEditDialogComponent;
      case 'description': return BusinessDescriptionEditDialogComponent
      default: return null;
    }
  }
}
