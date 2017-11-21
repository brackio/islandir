import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Keyword } from '../../../models/keywords/keyword';
import { KeywordService } from '../../../models/keywords/keyword.service';
import { AlertService } from '../../../core/alert.service';
import { GlobalErrorHandler as ErrorHandler } from '../../../core/global-error-handler';
import { DialogsService } from '../../../dialogs/shared/dialog.service';

@Component({
  selector: 'ilr-keyword-edit',
  templateUrl: './keyword-edit.component.html',
  styleUrls: ['./keyword-edit.component.scss']
})
export class KeywordEditComponent implements OnInit {
  public form: FormGroup;
  public keyword: Keyword;
  public editMode = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private keywordService: KeywordService,
    private alertService: AlertService,
    private errorHandler: ErrorHandler,
    private dialogsService: DialogsService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param === 'new') {
      this.editMode = false;
    }

    this.route.data
      .subscribe((data: { keyword: Keyword }) => {
        this.keyword = data.keyword;
        this.createForm(this.keyword);
      });
  }

  // get synonyms(): FormArray {
  //   return this.form.get('synonyms') as FormArray;
  // };

  public onSubmit(keyword: Keyword): void {
    this.alertService.saving();
    if (this.editMode) {
      this.updateKeyword(keyword);
    } else {
      this.createKeyword(keyword);
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
          this.deleteKeyword(id);
        }
      });
  }

  // public removeSynonym(i: number) : void {
  //   if(i > -1) {
  //     this.keyword.synonyms.splice(i, 1);
  //   }
  // }

  // public addSynonym(synonym: any) : void {
  //   // console.log(synonym.value);
  //   if (synonym.value !== '') {
  //     this.keyword.synonyms.push(synonym.value);
  //   }
  //   console.log(this.keyword.synonyms);
  // }

  private createForm(keyword: Keyword): void {
    this.form = this.fb.group({
      id: keyword.id,
      name: [keyword.name, [Validators.required]],
      weight: [this.keyword.weight, [Validators.required]],

    });
  }

  private deleteKeyword(id: string): void {
    this.keywordService.remove(id).then(
      () => {
        this.alertService.deleteAction();
        this.form.markAsPristine();
        this.goBack();
      },
      err => this.errorHandler.handleError(err));
  }

  private createKeyword(keyword: Keyword): void {
    this.keywordService.create(keyword)
      .then(
        () => {
          this.alertService.saveComplete();
          this.form.markAsPristine();
          this.goBack();
        },
        err => this.errorHandler.handleError(err));
  }

  private updateKeyword(keyword: Keyword): void {
    this.keywordService.update(keyword)
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
