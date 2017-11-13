import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Country } from '../../../models/countries/country';
import { CountryService } from '../../../models/countries/country.service';
import { AlertService }  from '../../../core/alert.service';
import { GlobalErrorHandler as ErrorHandler } from '../../../core/global-error-handler';
import { DialogsService } from '../../../dialogs/shared/dialog.service';

@Component({
  selector: 'ilr-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.scss']
})
export class CountryEditComponent implements OnInit {
  public form: FormGroup;
  public country: Country;
  public editMode = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private countryService: CountryService,
    private alertService: AlertService,
    private errorHandler: ErrorHandler,
    private dialogsService: DialogsService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('code');
    if (param === 'new') {
      this.editMode = false;
    }

    this.route.data
      .subscribe((data: { country: Country }) => {
        this.country = data.country;
        this.init(this.country);
      });
  }

  // get territories(): FormArray {
  //   return this.form.get('territories') as FormArray;
  // };

  public onSubmit(country: Country): void {
    this.alertService.saving();
    if (this.editMode) {
      this.updateCountry(country);
    } else {
      this.createCountry(country);
    }
  }

  public canDeactivate(): Promise<boolean> | boolean {
    if (this.form.pristine) {
      return true;
    }

    return this.dialogsService
      .confirmation(
        'Discard Changes?',
        'Are you sure you want to discard your changes?',
        'Discard').toPromise()
      .then(result => {
        return result;
      });
  }

  public cancel(): void {
    this.goBack();
  }

  public delete(): void {
    const id = this.form.get('id').value;

    this.dialogsService
      .confirmation(
        'Delete Service',
        'Are you sure you want to delete this service?',
        'Delete').toPromise()
      .then(result => {
        if (result) {
          this.deleteCountry(id);
        }
      });
  }

  private createForm(): void {
    this.form = this.fb.group({
      //id: '',
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      // territories: this.fb.array([]),
      zip: ['', [Validators.required]],
      active: ['', [Validators.required]]
    });
  }

  private init(country: Country): void {
    // this.form.setControl('territories', this.fb.array(country.territories));

    this.form.setValue({
      // id: country.id || '',
      name: country.name || '',
      code: country.code || '',
      zip: country.zip || false,
      active: this.country.active || false,
      // territories: country.territories || []
    });
  }

  private deleteCountry(id: string): void {
    this.countryService.delete(id).then(
      () => {
        this.alertService.deleteAction();
        this.form.markAsPristine();
        this.goBack();
      },
      err => this.errorHandler.handleError(err));
  }

  private createCountry(country: Country): void {
    this.countryService.create(country)
      .then(
        () => {
          this.alertService.saveComplete();
          this.form.markAsPristine();
          this.goBack();
        },
        err => this.errorHandler.handleError(err));
  }

  private updateCountry(country: Country): void {
    this.countryService.update(country)
      .then(
        () => {
          this.alertService.saveComplete();
          this.form.markAsPristine();
          this.goBack();
        },
        err => this.errorHandler.handleError(err));
  }

  private goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }



}