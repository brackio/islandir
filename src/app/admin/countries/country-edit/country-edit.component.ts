import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { TdDialogService } from '@covalent/core';
import { Observable } from 'rxjs/Observable';

import { Country } from '../../../models/countries/country';
import { CountryService } from '../../../models/countries/country.service';
import { MessageService } from '../../../core/message.service';

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
    private alertService: MessageService,
    private dialogService: TdDialogService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('code');
    if (param === 'new') {
      this.editMode = false;
    }

    this.route.data
      .subscribe((data: { country: Country }) => {
        this.country = data.country;
        this.createForm(this.country);
      });
  }

  get territories(): FormArray {
    return this.form.get('territories') as FormArray;
  }

  public save(country: Country): void {
    this.alertService.saving();
    if (this.editMode) {
      this.updateCountry(country);
    } else {
      this.createCountry(country);
    }
  }

  public canDeactivate(): Observable<boolean> | boolean {
    if (this.form.pristine) {
      return true;
    }

    return this.dialogService.openConfirm({
      message: 'Are you sure you want to discard your changes?',
      disableClose: true,
      title: 'Discard Changes',
      cancelButton: 'Cancel',
      acceptButton: 'Discard',
    }).afterClosed();
  }

  public cancel(): void {
    this.goBack();
  }

  public addTerritory(): void {
    const control = new FormControl();
    control.setValue('');
    this.territories.push(control);
  }

  public removeTerritory(index: number): void {
    this.territories.removeAt(index);
  }

  public delete(): void {
    const id = this.form.get('id').value;

    this.dialogService.openConfirm({
      message: 'Are you sure you want to delete this country?',
      disableClose: true,
      title: 'Delete Category',
      cancelButton: 'Cancel',
      acceptButton: 'Delete',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.deleteCountry(id);
      }
    });
  }

  private createForm(country: Country): void {
    this.form = this.fb.group({
      id: [country.id],
      name: [country.name, [Validators.required]],
      code: [country.code, [Validators.required, Validators.pattern('[a-z]{2}$')]],
      territories: this.fb.array((!!country.territories) ? country.territories : ['']),
      hasZipCode: country.hasZipCode,
      active: country.active
    });
  }

  private deleteCountry(id: string): void {
    this.countryService.remove(id)
      .subscribe(
      () => {
        this.alertService.deleteAction();
        this.form.markAsPristine();
        this.goBack();
      });
  }

  private createCountry(country: Country): void {
    this.countryService.create(country)
      .subscribe(
        () => {
          this.alertService.saveComplete();
          this.form.markAsPristine();
          this.goBack();
        });
  }

  private updateCountry(country: Country): void {
    console.log(country);
    this.countryService.update(country)
      .subscribe(
        () => {
          this.alertService.saveComplete();
          this.form.markAsPristine();
          this.goBack();
        });
  }

  private goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
