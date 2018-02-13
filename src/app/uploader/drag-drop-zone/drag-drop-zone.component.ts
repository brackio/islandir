import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions, UploadStatus } from 'ngx-uploader';
import { Cloudinary } from '@cloudinary/angular-5.x';

import { CONFIG } from '../../core/config';

@Component({
  selector: 'ilr-drag-drop-zone',
  templateUrl: './drag-drop-zone.component.html',
  styleUrls: ['./drag-drop-zone.component.scss']
})
export class DragDropZoneComponent implements OnInit {
  @Input() folder: string;
  @Input() tags: string;
  @Input() images: string[];
  @Output() onFileUploaded: EventEmitter<any> = new EventEmitter<any>();
  public dragOver: boolean;
  public files: UploadFile[] = [];
  public options: UploaderOptions;
  public uploadInput: EventEmitter<UploadInput>;

  public acceptedMimeTypes = [
    'image/gif',
    'image/jpeg',
    'image/png'
  ];

  constructor(private cloudinary: Cloudinary) {
    this.options = { concurrency: 1 };
    this.uploadInput = new EventEmitter<UploadInput>();
  }

  ngOnInit() {
  }

  public onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      this.upload();
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      const form: FormData = new FormData();
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      const tags = this.tags;
      form.append('folder', `${CONFIG.appname}/${this.folder}`);
      form.append('tags', tags);
      form.append('file', output.file.nativeFile);

      output.file.form = form;
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'done' && typeof output.file !== 'undefined') {
      this.save(output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if (output.type === 'rejected' && typeof output.file !== 'undefined') {
      console.log(output.file.name + ' rejected');
    }

    this.files = this.files.filter(file => file.progress.status !== UploadStatus.Done);
  }

  public cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  public removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  public removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }

  private save(file: UploadFile): void {
    this.onFileUploaded.emit(file.response);
  }

  private upload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      withCredentials: false,
      method: 'POST'
    };
    this.uploadInput.emit(event);
  }

}
