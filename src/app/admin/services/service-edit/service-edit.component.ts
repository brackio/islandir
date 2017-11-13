import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Service } from '../../../models/services/service';
import { ServiceService } from '../../../models/services/service.service';
import { Category } from '../../../models/categories/category';
import { CategoryService } from '../../../models/categories/category.service';
import { AlertService } from '../../../core/alert.service';
import { GlobalErrorHandler as ErrorHandler } from '../../../core/global-error-handler';
import { DialogsService } from '../../../dialogs/shared/dialog.service';

@Component({
  selector: 'ilr-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: [
    './service-edit.component.scss',
    '../../../../form-card.scss'
  ]
})
export class ServiceEditComponent implements OnInit {
  public form: FormGroup;
  public service: Service;
  public categories: Category[];
  public editMode = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private categoryService: CategoryService,
    private alertService: AlertService,
    private errorHandler: ErrorHandler,
    private dialogsService: DialogsService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param === 'new') {
      this.editMode = false;
    }
    this.getCategories();

    this.route.data
      .subscribe((data: { service: Service }) => {
        this.service = data.service;
        this.init(this.service);
      });
  }

  public onSubmit(service: Service): void {
    this.alertService.saving();
    if (this.editMode) {
      this.updateService(service);
    } else {
      this.createService(service);
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
          this.deleteService(id);
        }
      });
  }

  private createForm(): void {
    this.form = this.fb.group({
      id: '',
      name: ['', [Validators.required]],
      category: ['', Validators.required]
    });
  }

  private init(service: Service): void {
    this.form.setValue({
      id: service.id || '',
      name: service.name || '',
      category: (this.service.category) ? this.service.category.id : ''
    });
  }

  private getCategories(): void {
    this.categoryService.fetch(['name', 'icon'])
      .subscribe(categories => this.categories = categories);
  }

  private deleteService(id: string): void {
    this.serviceService.remove(id).then(
      () => {
        this.alertService.deleteAction();
        this.form.markAsPristine();
        this.goBack();
      },
      err => this.errorHandler.handleError(err));
  }

  private createService(service: Service): void {
    this.serviceService.create(service)
      .then(
        () => {
          this.alertService.saveComplete();
          this.form.markAsPristine();
          this.goBack();
        },
        err => this.errorHandler.handleError(err));
  }

  private updateService(service: Service): void {
    this.serviceService.update(service)
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
