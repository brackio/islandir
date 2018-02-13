import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TdDialogService } from '@covalent/core/dialogs';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

import { Topic } from '../../../models/topics/topic';
import { TopicService } from '../../../models/topics/topic.service';
import { MessageService } from '../../../core/message.service';

@Component({
  selector: 'ilr-topic-edit',
  templateUrl: './topic-edit.component.html',
  styleUrls: ['./topic-edit.component.scss']
})
export class TopicEditComponent implements OnInit {
  public form: FormGroup;
  public topic: Topic;
  public descriptionCharLength: number = 500;
  public editMode: boolean = true;
  public selectable: boolean = false;
  public removable: boolean = true;
  public addOnBlur: boolean = false;
  public separatorKeysCodes = [ENTER, COMMA];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private topicService: TopicService,
    private dialogService: TdDialogService,
    private messageService: MessageService,
    private cloudinary: Cloudinary,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param === 'new') {
      this.editMode = false;
    }

    this.route.data
      .subscribe((data: { topic: Topic }) => {
        this.topic = data.topic;
        this.createForm(this.topic);
      });
  }

  get image() { return this.form.get('image.name'); }
  get url() { return this.form.get('image.url'); }
  get thumbnail() { return this.form.get('image.thumbnail'); }
  get tags(): FormArray { return this.form.get('tags') as FormArray; }
  get description() { return this.form.get('description'); }

  set image(val) { this.form.get('image.name').setValue(val); }
  set url(val) { this.form.get('image.url').setValue(val); }
  set thumbnail(val) { this.form.get('image.thumbnail').setValue(val); }

  public cancel(): void {
    this.goBack();
  }

  public addTag(event: MatChipInputEvent): void {
    const control = new FormControl();
    control.setValue(event.value);
    this.tags.push(control);
    this.form.markAsDirty();
  }

  public removeTag(index: number): void {
    this.tags.removeAt(index);
    this.form.markAsDirty();
  }

  public imageUploaded(data: any): any {
    this.image = data.public_id;
    this.url = data.secure_url;
    this.form.markAsDirty();
  }

  private createForm(topic: Topic): void {
    this.form = this.fb.group({
      id: topic.id,
      name: [topic.name, [Validators.required]],
      image: this.fb.group({
        name: this.topic.image.name,
        url: this.topic.image.url,
        styles: this.fb.group({
          backgroundPosition: this.topic.image.styles.backgroundPosition
        }),
        thumbnail: this.topic.image.thumbnail
      }),
      tags: this.fb.array(topic.tags || []),
      description: [topic.description, [Validators.maxLength(this.descriptionCharLength)]]
    });
  }

  public save(topic: Topic): void {
    this.messageService.saving();
    if (this.editMode) {
      this.updateTopic(topic);
    } else {
      this.createTopic(topic);
    }
  }

  private createTopic(topic: Topic): void {
    this.topicService.create(topic)
      .subscribe(
        () => {
          this.messageService.saveComplete();
          this.form.markAsPristine();
          this.goBack();
        });
  }

  private updateTopic(topic: Topic): void {
    this.topicService.update(topic)
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
