import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatSelectChange } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { switchMap, catchError, debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { MessageService } from '../../core/message.service';
import { Business } from '../shared/business';
import { Country } from '../../models/countries/country';
import { Service } from '../../models/services/service';
import { BusinessService } from '../shared/business.service';
import { ServiceService } from '../../models/services/service.service';
import { CountryService } from '../../models/countries/country.service';
import { CustomValidators } from '../../core/custom-validators';
import { CONFIG } from '../../core/config';

@Component({
  selector: 'ilr-business-create',
  templateUrl: './business-create.component.html',
  styleUrls: ['./business-create.component.scss'],
})
export class BusinessCreateComponent implements OnInit {
  public form: FormGroup;
  public business: Business;
  public countries: Country[];
  public territories: string[] = [];
  public searchedServices: Observable<Service[]> ;
  private searchServiceTerms = new Subject<string>();
  public hasZip: boolean = false;
  public removable: boolean = true;
  public selectable: boolean = true;
  public showMoreInfo: boolean = false;
  public descriptionCharLength: number = CONFIG.descriptionLength;
  public maxServices: number = CONFIG.maxServices;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private businessService: BusinessService,
    private countryService: CountryService,
    private serviceService: ServiceService,
    private alertService: MessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    // this.route.parent.data
    //   .subscribe((data: { business: Business }) => {
      this.business = new Business();
      this.createForm();
      this.getCountries();
      // });

    this.searchedServices = this.searchServiceTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      startWith(null),
      switchMap(term => term ?
        this.serviceService.search(term, 5, 'name', 'asc', ['-category', '-id', '-slug'])
        : of<Service[]>([])),
      catchError(err => of<Service[]>([])));
  }

  get name() { return this.form.get('name'); }
  get description() { return this.form.get('description'); }
  get email() { return this.form.get('email'); }
  get website() { return this.form.get('website'); }
  get phone() { return this.form.get('phone'); }
  get zip() { return this.form.get('address.zip'); }
  get street() { return this.form.get('address.street'); }
  get city() { return this.form.get('address.city'); }
  get services(): FormArray { return this.form.get('services') as FormArray;  }
  get social(): FormArray { return this.form.get('social') as FormArray; }

  set name(val) { this.form.get('name').setValue(val); }
  set email(val) { this.form.get('email').setValue(val); }
  set website(val) { this.form.get('website').setValue(val); }
  set city(val) { this.form.get('address.city').setValue(val); }
  set zip(val) { this.form.get('address.zip').setValue(val); }
  set phone(val) { this.form.get('phone').setValue(val); }
  set street(val) { this.form.get('address.street').setValue(val); }
  set territory(val) { this.form.get('address.territory').setValue(val); }

  public getCountries(): void {
    this.countryService.getActive()
      .subscribe(countries => {
        this.countries = countries;
        const country = this.getCountry(this.countryService.country.code);
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

  public saveBusiness(business: Business): void {
    this.businessService.update(business)
      .subscribe(() => this.alertService.saveComplete());
  }

  public cancel(): void {

  }

  public addService(event: MatAutocompleteSelectedEvent): void {
    const control = new FormControl();
    control.setValue(event.option.value);
    this.services.push(control);
    // this.business.services.push(service);
  }

  public addSocial(): void {
    this.social.push(new FormControl());
  }

  public removeSocial(index: number): void {
    this.social.removeAt(index);
  }

  public removeService(index: number): void {
    this.services.removeAt(index);
    // const index = this.business.services.indexOf(service);
    // if (index > -1) {
    //   this.business.services.splice(index, 1);
    // }
  }

  public searchServices(term: string): void {
    this.searchServiceTerms.next(term);
  }

  private getCountry(code: string): Country {
    return this.countries.find(c =>
      c.code === code);
  }

  private setTerritories(country: Country): void {
    if (country && country.territories) {
      this.territories = country.territories;
      if (this.territories.length) {
        this.territory = this.territories[0];
      }
    }
  }

  private createForm(): void {
    this.form = this.fb.group({
      id: '',
      name: ['',
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(2),
        ]],
      slug: [{ value: '', disabled: true}],
      address: this.fb.group({
        country: this.fb.group({
          code: [this.countryService.country.code, [Validators.required]]
        }),
        territory: '',
        street: '',
        city: '',
        zip: ['', [CustomValidators.zipCodeValidator]]
      }),
      phone: ['', [Validators.pattern('\\(?([0-9]{3})\\)?([ .-]?)([0-9]{3})\\2([0-9]{4})')]],
      email: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      website: ['', [Validators.pattern('https?://.+')]],
      services: this.fb.array([], CustomValidators.rangeValidator(1, this.maxServices)),
      social:  this.fb.array(['']),
      description: ['', [Validators.maxLength(this.descriptionCharLength)]]
    });
  }

}

