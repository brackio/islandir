import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TdDialogService } from '@covalent/core';
import { Observable } from 'rxjs/Observable';

import { Service } from '../../../models/services/service';
import { ServiceService } from '../../../models/services/service.service';
import { Category } from '../../../models/categories/category';
import { CategoryService } from '../../../models/categories/category.service';
import { MessageService } from '../../../core/message.service';

@Component({
  selector: 'ilr-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.scss']
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
    private alertService: MessageService,
    private dialogService: TdDialogService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param === 'new') {
      this.editMode = false;
    }
    this.getCategories();

    this.route.data
      .subscribe((data: { service: Service }) => {
        this.service = data.service;
        this.createForm(this.service);
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

  public delete(): void {
    const id = this.form.get('id').value;

    this.dialogService.openConfirm({
      message: 'Are you sure you want to delete this category?',
      disableClose: true,
      title: 'Delete Category',
      cancelButton: 'Cancel',
      acceptButton: 'Delete',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.deleteService(id);
      }
    });
  }

  private createForm(service: Service): void {
    this.form = this.fb.group({
      id: service.id,
      name: [service.name, [Validators.required]],
      category: [service.category, Validators.required]
    });
  }

  private getCategories(): void {
    this.categoryService.fetch(['name', 'icon'])
      .subscribe(categories => this.categories = categories);
  }

  private deleteService(id: string): void {
    this.serviceService.remove(id)
      .subscribe(
      () => {
        this.alertService.deleteAction();
        this.form.markAsPristine();
        this.goBack();
      });
  }

  private createService(service: Service): void {
    this.serviceService.create(service)
      .subscribe(
        () => {
          this.alertService.saveComplete();
          this.form.markAsPristine();
          this.goBack();
        });
  }

  private updateService(service: Service): void {
    this.serviceService.update(service)
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
