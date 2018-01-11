import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Business} from '../../shared/business';
import { BusinessHoursEditDialogComponent } from '../business-hours-edit-dialog/business-hours-edit-dialog.component';
import { BusinessNameEditDialogComponent } from '../business-name-edit-dialog/business-name-edit-dialog.component';
import { BusinessServicesEditDialogComponent } from '../business-services-edit-dialog/business-services-edit-dialog.component';
import { BusinessLocationEditDialogComponent } from '../business-location-edit-dialog/business-location-edit-dialog.component';
import { BusinessDescriptionEditDialogComponent } from '../business-description-edit-dialog/business-description-edit-dialog.component';
import { BusinessContactEditDialogComponent } from '../business-contact-edit-dialog/business-contact-edit-dialog.component';
import { GeolocatorService } from '../../../core/geolocator.service';
import { DialogsService } from '../../../core/dialog.service';

@Component({
  selector: 'ilr-business-info',
  templateUrl: './business-info.component.html',
  styleUrls: ['./business-info.component.scss']
})
export class BusinessInfoComponent implements OnInit {
  public business: Business;
  public staticMapUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private geolocatorService: GeolocatorService,
    private dialogService: DialogsService
  ) { }

  ngOnInit() {
    this.route.parent.parent.data
      .subscribe((data: { business: Business }) => {
        this.business = data.business;
        this.updateStaticMapUrl(this.business);
      });
  }

  public openDialog(dialogName: string) {
    let dialogRef = this.dialog.open(this.getDialogComponent(dialogName),
      this.dialogService.componentDialogConfig(this.business));

    dialogRef.afterClosed().subscribe((result: Business) => {
      if (!!result) {
        this.business = result;

      if (dialogName === 'address') {
          this.updateStaticMapUrl(result);
        }
      }
      dialogRef = null;
    });
  }

  private updateStaticMapUrl(business: Business): void {
    if (business.longitude && business.latitude) {
      this.staticMapUrl = this.geolocatorService.staticMapUrl(business.latitude, business.longitude);
    }
  }

  private getDialogComponent(name: string): any {
    switch (name) {
      case 'name': return BusinessNameEditDialogComponent;
      case 'address': return BusinessLocationEditDialogComponent;
      case 'services': return BusinessServicesEditDialogComponent;
      case 'contact': return BusinessContactEditDialogComponent;
      case 'hours': return BusinessHoursEditDialogComponent;
      case 'description': return BusinessDescriptionEditDialogComponent;
      default: return null;
    }
  }

}
