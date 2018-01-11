import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { MessageService } from '../../../core/message.service';

import { Business } from '../../shared/business';
import { BusinessService } from '../../shared/business.service';
import { Country } from '../../../models/countries/country';
import { CountryService } from '../../../models/countries/country.service';
import { CustomValidators } from '../../../core/custom-validators';

@Component({
  selector: 'ilr-business-location-edit-dialog',
  templateUrl: './business-location-edit-dialog.component.html',
  styleUrls: ['./business-location-edit-dialog.component.scss']
})
export class BusinessLocationEditDialogComponent implements OnInit {
  public locationForm: FormGroup;
  public countries: Country[];
  public territories: string[] = [];
  public hasZip: boolean = false;
  private business: Business;

  constructor(
    public dialogRef: MatDialogRef<BusinessLocationEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Business,
    private businessService: BusinessService,
    private countryService: CountryService,
    private alertService: MessageService,
    private fb: FormBuilder
  ) {
    this.business = data;
    this.createForm(this.business);
  }

  ngOnInit() {
    this.getCountries(this.business);
  }

  get zip() { return this.locationForm.get('address.zip'); }
  get street() { return this.locationForm.get('address.street'); }
  get city() { return this.locationForm.get('address.city'); }

  set city(val) { this.locationForm.get('address.city').setValue(val); }
  set zip(val) { this.locationForm.get('address.zip').setValue(val); }
  set street(val) { this.locationForm.get('address.street').setValue(val); }
  set territory(val) { this.locationForm.get('address.territory').setValue(val); }

  public getCountries(business: Business): void {
    this.countryService.getActive()
      .subscribe(countries => {
        this.countries = countries;
        const country = this.getCountry(this.business.address.country.code);
        if (country) {
          this.setTerritories(country);
          this.hasZip = country.hasZipCode;
        }
      });
  }

  public countryChanged(event: MatSelectChange): void {
    const country = this.getCountry(event.value);
    if (country) {
      this.setTerritories(country);
      this.hasZip = country.hasZipCode;
    }
  }

  private getCountry(code: string): Country {
    return this.countries.find(c =>
      c.code === code);
  }

  private setTerritories(country: Country): void {
    if (country && country.territories) {
      this.territories = country.territories;
    }
  }

  private createForm(business: Business): void {
    this.locationForm = this.fb.group({
      id: business.id,
      name: business.name,
      address: this.fb.group({
        country: this.fb.group({
          name: business.address.country.name,
          code: [business.address.country.code, [Validators.required]]
        }),
        territory: business.address.territory,
        street: business.address.street,
        city: business.address.city,
        zip: [business.address.zip, [CustomValidators.zipCodeValidator]]
      }),
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
