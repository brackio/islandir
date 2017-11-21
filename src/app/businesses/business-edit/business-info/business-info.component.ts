import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material';

import { Country } from '../../../models/countries/country';
import { CountryService } from '../../../models/countries/country.service';
import { Business } from '../../shared/business';
import { BusinessService } from '../../shared/business.service';
import { AlertService } from '../../../core/alert.service';
import { GlobalErrorHandler as ErrorHandler } from '../../../core/global-error-handler';

@Component({
  selector: 'ilr-business-info',
  templateUrl: './business-info.component.html',
  styleUrls: ['./business-info.component.scss']
})

export class BusinessInfoComponent implements OnInit {
  public form: FormGroup;
  public business: Business;
  public countries: Country[];
  public territories: string[];
  public hasZipCode = false;

  public lat: Number = 18.3223;
  public lng: Number  = -64.9637;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private businessService: BusinessService,
    private countryService: CountryService,
    private alertService: AlertService,
    private errorHandler: ErrorHandler,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.route.parent.data
      .subscribe((data: { business: Business }) => {
        this.business = data.business;
        this.init(this.business);
        this.getCountries();
        this.getTerritories(this.business.address.country.code);
      });
  }

  get name() { return this.form.get('name'); }
  set name(val) { this.form.get('name').value(val); }

  get description() { return this.form.get('description'); }

  public save(business: Business): void {
    this.alertService.saving();
    this.businessService.update(business)
      .then(
        (business: Business) => {
          this.business = business;
          this.alertService.saveComplete();
        },
        err => this.errorHandler.handleError(err));
  }

  public onCountrySelected(event: MatSelectChange): void {
    this.getCountry(event.value)
      .then(country => this.getTerritories(country.code));
  }

  private getCountry(code: string): Promise<Country> {
    return this.countryService.findOne(code)
      .then(country => {
        return country;
      });
  }

  private getTerritories(code: string): void {
    this.getCountry(code).then((country: Country) => {
      this.territories = country.territories;
      this.hasZipCode = country.hasZipCode;
    });
  }

  private getCountries(): void {
    this.countryService.getActive()
      .subscribe(
        countries => this.countries = countries,
        err => this.errorHandler.handleError(err)
      );
  }

  private createForm(): void  {
    this.form = this.fb.group({
      id: '',
      name: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100)
      ]],
      slug: [{value: '', disabled: true}],
      //logo: [''],
      description: ['', [Validators.maxLength(300)]],
      address: this.fb.group({
        country: this.fb.group({
            name: ['', [Validators.required]],
            code: ['', [Validators.required]]
          }),
        territory: [''],
        city: [''],
        street: [''],
        zip: ['']
      }),
      //social: this.fb.array([]),
      // phone: [''],
      //email: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
      // website: ['']
    });
  }

  private init(business: Business): void {
    this.form.setValue({
      id: business.id || '',
      name: business.name || '',
      slug: business.slug || '',
      // // logo: business.logo || '',
      description: business.description || '',
      address: {
        country: {
          name: business.address.country.name || '',
          code: business.address.country.code || ''
        },
        territory: business.address.territory || '',
        city: business.address.city || '',
        street: business.address.street || '',
        zip: business.address.zip || ''
      },
      // phone: business.phone || '',
      // email: business.email || '',
      // website: business.website || '',
      //social: business.social
    });
  }


  // public openDialog(data: any, name: string) {
  //   const config = new MatDialogConfig();
  //   config.width = '480px';
  //   config.data = data;
  //
  //   let dialogRef = this.dialog.open(this.getDialogComponent(name), config);
  //   dialogRef.afterClosed().subscribe(result => {
  //
  //     if (!!result) {
  //       let business = this.newBusiness(this.business);
  //       business[name] = result;
  //       this.save(business);
  //
  //       // let business = new Business();
  //       // business.id = this.business.id;
  //       // business[name] = result;
  //       // this.save(business);
  //     }
  //
  //     dialogRef = null;
  //   });
  // }



  // private getDialogComponent(name: string) : any {
  //   switch (name) {
  //     case 'name': return BusinessNameDialogComponent;
  //     case 'social': return BusinessSocialDialogComponent;
  //     case 'phone': return BusinessPhoneDialogComponent;
  //     case 'email': return BusinessEmailDialogComponent;
  //     case 'address': return BusinessAddressDialogComponent;
  //     case 'website': return BusinessWebsiteDialogComponent;
  //     case 'amenities': return BusinessAmenitiesDialogComponent;
  //     case 'description': return BusinessDescriptionDialogComponent;
  //     case 'services': return BusinessServicesDialogComponent;
  //     default: return null;
  //   }
  // }

  // private newBusiness(business: Business) : Business {
  //   let b = new Business();
  //   b.id = business.id;
  //   b.name = business.name;
  //   b.social = business.social;
  //   b.phone = business.phone;
  //   b.email = business.email;
  //   // b.country = business.country;
  //   b.address = business.address;
  //   b.amenities = business.amenities;
  //   b.description = business.description;
  //   b.services = business.services;
  //
  //   return b;
  // }
}
