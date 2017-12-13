import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/startWith';
import { AlertService } from '../../../core/alert.service';
import { GlobalErrorHandler as ErrorHandler } from '../../../core/global-error-handler';
import { CustomValidators } from '../../../core/custom-validators';

import { Service } from '../../../models/services/service';
import { ServiceService } from '../../../models/services/service.service';
import { Business } from '../../shared/business';
import { BusinessService } from '../../shared/business.service';
import { CONFIG } from '../../../core/config';

@Component({
  selector: 'ilr-business-services-edit-dialog',
  templateUrl: './business-services-edit-dialog.component.html',
  styleUrls: ['./business-services-edit-dialog.component.scss']
})
export class BusinessServicesEditDialogComponent implements OnInit {
  public servicesForm: FormGroup;
  public removable: boolean = true;
  public selectable: boolean = true;
  public searchedServices: Observable<Service[]> ;
  private searchServiceTerms = new Subject<string>();
  public maxServices: number = CONFIG.maxServices;

  constructor(
    public dialogRef: MatDialogRef<BusinessServicesEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Business,
    private businessService: BusinessService,
    private serviceService: ServiceService,
    private alertService: AlertService,
    private errorHandler: ErrorHandler,
    private fb: FormBuilder
  ) {
    this.createForm(data);
  }

  ngOnInit() {
    this.searchedServices = this.searchServiceTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .startWith(null)
      .switchMap(term => term ?
        this.serviceService.search(term, 5, 'name', 'asc', ['-category', '-id', '-slug'])
        : Observable.of<Service[]>([]))
      .catch(error => Observable.of<Service[]>([]));
  }

  get services(): FormArray { return this.servicesForm.get('services') as FormArray;  }

  public addService(event: MatAutocompleteSelectedEvent): void {
    const control = new FormControl();
    control.setValue(event.option.value);
    this.services.push(control);
  }

  public removeService(index: number): void {
    this.services.removeAt(index);
  }

  public searchServices(term: string): void {
    this.searchServiceTerms.next(term);
  }

  public save(business: Business): void {
    console.log(business);
    this.businessService.update(business)
      .then((result) => {
        this.alertService.saveComplete();
        this.dialogRef.close(result);
      }, err => this.errorHandler.handleError(err));
  }

  public cancel(): void {
    this.dialogRef.close(false);
  }

  private createForm(business: Business): void {
    this.servicesForm = this.fb.group({
      id: business.id,
      name: business.name,
      services: this.fb.array(business.services.map(service =>
        this.fb.control(service)), CustomValidators.rangeValidator(1, this.maxServices))
    });
  }
}
