import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TdDialogService } from '@covalent/core';
import { Observable } from 'rxjs/Observable';

import { Category } from '../../../models/categories/category';
import { CategoryService } from '../../../models/categories/category.service';
import { MessageService } from '../../../core/message.service';

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
    private messageService: MessageService,
    private dialogService: TdDialogService,
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

  public save(category: Category): void {
    this.messageService.saving();
    if (this.editMode) {
      this.updateCategory(category);
    } else {
      this.createCategory(category);
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
    this.categoryService.remove(id)
      .subscribe(
      () => {
        this.messageService.deleteAction();
        this.form.markAsPristine();
        this.goBack();
      });
  }

  private createCategory(category: Category): void {
    this.categoryService.create(category)
      .subscribe(
        () => {
          this.messageService.saveComplete();
          this.form.markAsPristine();
          this.goBack();
      });
  }

  private updateCategory(category: Category): void {
    this.categoryService.update(category)
      .subscribe(
        () => {
          this.messageService.saveComplete();
          this.form.markAsPristine();
          this.goBack();
      });
  }

  private goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
