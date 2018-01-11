import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TdDialogService } from '@covalent/core';
import { Observable } from 'rxjs/Observable';

import { Keyword } from '../../../models/keywords/keyword';
import { KeywordService } from '../../../models/keywords/keyword.service';
import { MessageService } from '../../../core/message.service';

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
    private alertService: MessageService,
    private dialogService: TdDialogService,
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
      message: 'Are you sure you want to delete this keyword?',
      disableClose: true,
      title: 'Delete Category',
      cancelButton: 'Cancel',
      acceptButton: 'Delete',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
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
    this.keywordService.remove(id)
      .subscribe(
      () => {
        this.alertService.deleteAction();
        this.form.markAsPristine();
        this.goBack();
      });
  }

  private createKeyword(keyword: Keyword): void {
    this.keywordService.create(keyword)
      .subscribe(
        () => {
          this.alertService.saveComplete();
          this.form.markAsPristine();
          this.goBack();
      });
  }

  private updateKeyword(keyword: Keyword): void {
    this.keywordService.update(keyword)
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
