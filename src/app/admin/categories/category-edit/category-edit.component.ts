import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Category } from '../../../models/categories/category';
import { CategoryService } from '../../../models/categories/category.service';
import { GlobalErrorHandler as ErrorHandler } from '../../../core/global-error-handler';
import { AlertService } from '../../../core/alert.service';
import { DialogsService } from '../../../dialogs/shared/dialog.service';

@Component({
  selector: 'ilr-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
  public form: FormGroup;
  public category: Category;
  public editMode = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private errorHandler: ErrorHandler,
    private alertService: AlertService,
    private dialogsService: DialogsService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param === 'new') {
      this.editMode = false;
    }

    this.route.data
      .subscribe((data: { category: Category }) => {
        this.category = data.category;
        this.createForm(this.category);
      });
  }

  public onSubmit(category: Category): void {
    this.alertService.saving();
    if (this.editMode) {
      this.updateCategory(category);
    } else {
      this.createCategory(category);
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
        'Delete Category',
        'Are you sure you want to delete this category?',
        'Delete').toPromise()
      .then(result => {
        if (result) {
          this.deleteCategory(id);
        }
      });
  }

  private createForm(category: Category): void  {
    this.form = this.fb.group({
      id: category.id,
      name: [category.name, [Validators.required]],
      icon: [category.icon, [Validators.required]],
      color: [category.color, [Validators.required]]
    });
  }

  private init(category: Category): void {
    this.form.setValue({
      id: category.id || '',
      name: category.name || '',
      icon: category.icon || '',
      color: category.color || ''
    });
  }

  private deleteCategory(id: string): void {
    this.categoryService.remove(id).then(
      () => {
        this.alertService.deleteAction();
        this.form.markAsPristine();
        this.goBack();
      },
      () => err => this.errorHandler.handleError(err));
  }

  private createCategory(category: Category): void {
    this.categoryService.create(category)
      .then(
        () => {
          this.alertService.saveComplete();
          this.form.markAsPristine();
          this.goBack();
        },
        err => this.errorHandler.handleError(err));
  }

  private updateCategory(category: Category): void {
    this.categoryService.update(category)
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
