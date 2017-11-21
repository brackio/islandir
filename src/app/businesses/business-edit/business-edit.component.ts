import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatSelectChange, MatChipInputEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/startWith';
import { ENTER } from '@angular/cdk/keycodes';

import { Business } from '../shared/business';
import { Country } from '../../models/countries/country';
import { Service } from '../../models/services/service';
import { ServiceService } from '../../models/services/service.service';
import { CountryService } from '../../models/countries/country.service';
import { CustomValidators } from '../../core/custom-validators';
const COMMA = 188;

@Component({
  selector: 'ilr-business-edit',
  templateUrl: './business-edit.component.html',
  styleUrls: ['./business-edit.component.scss']
})
export class BusinessEditComponent implements OnInit {
  public form: FormGroup;
  public business: Business;
  public countries: Country[];
  public territories: string[] = [];
  public searchedServices: Observable<Service[]> ;
  private searchServiceTerms = new Subject<string>();
  public selectable: boolean = false;
  public removable: boolean = true;
  public addOnBlur: boolean = false;
  public hasZip: boolean = false;
  public showMoreInfo: boolean = false;
  public separatorKeysCodes = [ENTER, COMMA];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countryService: CountryService,
    private serviceService: ServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.route.parent.data
      .subscribe((data: { business: Business }) => {
        this.business = data.business;
        this.getCountries(this.business);
        this.createForm(this.business);
        this.showMoreInfo = (!!this.business.name);
      });

    this.searchedServices = this.searchServiceTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .startWith(null)
      .switchMap(term => term ?
        this.serviceService.search(term, 5, 'name', 'asc', ['-category', '-id'])
          : Observable.of<Service[]>([]))
      .catch(error => Observable.of<Service[]>([]));
  }

  get name() { return this.form.get('name'); }
  get description() { return this.form.get('description'); }
  get social(): FormArray {
    return this.form.get('social') as FormArray;
  }


  public getCountries(business: Business): void {
    this.countryService.getActive()
      .subscribe(countries => {
        this.countries = countries;
        const country = this.getCountry(business.address.country.code);
        this.setTerritories(country);
        this.hasZip = country.hasZipCode;
      });
  }

  public countryChanged(event: MatSelectChange): void {
    const country = this.getCountry(event.value);
    this.setTerritories(country);
    this.hasZip = country.hasZipCode;
  }


  public addService(event: MatChipInputEvent): void {

  }

  public removeService(service: Service): void {

  }

  public searchServices(term: string): void {
    this.searchServiceTerms.next(term);
  }

  private getCountry(code: string): Country {
    return this.countries.find(c =>
      c.code === code);
  }

  private setTerritories(country: Country): void {
    this.territories = country.territories;
  }

  private createForm(business: Business): void {
    this.form = this.fb.group({
      id: [business.id],
      name: [business.name,
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(2),
        ]],
      slug: [{ value: business.slug, disabled: true}, [Validators.required]],
      address: this.fb.group({
        country: this.fb.group({
          name: [business.address.country.name, [Validators.required]],
          code: [business.address.country.code, [Validators.required]]
        }),
        territory: [business.address.territory],
        street: [business.address.street],
        city: [business.address.city],
        zip: [business.address.zip, [CustomValidators.zipCodeValidator]]
      }),
      phone: [business.phone],
      email: [business.email, [Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      website: [business.website, [Validators.pattern('https?://.+')]],
      social:  this.fb.array(business.social || []),
      description: [this.business.description || '', [Validators.maxLength(300)]]
    });
  }


}
