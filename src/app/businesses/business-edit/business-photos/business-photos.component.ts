import { Component, OnInit, EventEmitter } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions, UploadStatus } from 'ngx-uploader';

import { User } from '../../../user/shared/user';
import { UserService } from '../../../user/shared/user.service';
import { Business, Photo } from '../../shared/business';
import { BusinessService } from '../../shared/business.service';
import { UploadService } from '../../../core/upload.service';
import { MessageService } from '../../../core/message.service';
import { CONFIG } from '../../../core/config';

@Component({
  selector: 'ilr-business-photos',
  templateUrl: './business-photos.component.html',
  styleUrls: ['./business-photos.component.scss']
})

export class BusinessPhotosComponent implements OnInit {
  public business: Business;
  public user: User;
  public options: UploaderOptions;
  public files: UploadFile[];
  public uploadInput: EventEmitter<UploadInput>;
  public humanizeBytes: Function;
  public dragOver: boolean = false;
  public acceptedMimeTypes = [
    'image/gif',
    'image/jpeg',
    'image/png'
  ];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private uploadService: UploadService,
    private alertService: MessageService,
    private businessService: BusinessService
  ) {
    this.options = { concurrency: 1, allowedContentTypes: this.acceptedMimeTypes };
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {
    this.user = this.userService.currentUser;
    this.route.parent.parent.data
      .subscribe((data: { business: Business }) => {
        this.business = data.business;
        this.business.photos.map(photo => {
          this.files.push();
        });
      });
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') {
      this.previewFile(output.file);
      // this.files.push(output.file);
      // this.photos.push({ url: null});
      this.startUpload(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'done' && typeof output.file !== 'undefined') {
      // output.file.form.set(output.file.nativeFile.name, '', '');
      const url: string = output.file.form.get('url') as string;
      const filename: string = output.file.form.get('filename') as string;

      const photo: Photo = this.addPhoto(filename, url);
      this.business.photos.push(photo);
      this.businessService.update(this.business)
        .subscribe((business: Business) => this.business = business);
    } else if (output.type === 'removed') {
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
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

  public startUpload(file: UploadFile): void {
    this.uploadService.getPreSignedUrl()
      .subscribe((result: any) => {
        file.form.set('url', `${CONFIG.imgix.host}/${result.filename}`);
        file.form.set('filename', result.filename);

        const event: UploadInput = {
          type: 'uploadFile',
          url: result.url,
          method: 'PUT',
          file: file
        };

        this.uploadInput.emit(event);
      });
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }

  public previewFile(file: UploadFile) {
    if (file && this.validateFile(file)) {

      const reader = new FileReader();
      reader.readAsDataURL(file.nativeFile);
      reader.onload = () => {
        const fileUri = reader.result;
        file.form.set('dataUri', fileUri);
      };
      this.files.push(file);
    } else {
      this.alertService.error('Image size cannot be exceed 10MB in size');
    }
  }

  validateFile(file: UploadFile) {
    return this.acceptedMimeTypes.includes(file.type) && file.size < 1000000 * 10;
  }

  public uploadPhotos(): void {
    for (let i = 0; i < this.files.length; i++) {
      this.uploadService.getPreSignedUrl()
        .subscribe((result: any) => {
          const url = result.url;
          const filename = result.filename;
          const req = this.uploadService.uploadFile(url, this.files[i].nativeFile);

          this.http.request(req).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
              const percentDone = Math.round(100 * event.loaded / event.total);
              // console.log(`File is ${percentDone}% uploaded.`);
            } else if (event instanceof HttpResponse) {
              // console.log('File is completely uploaded!');

              const photo: Photo = this.addPhoto(filename);
              this.business.photos.push(photo);
              this.businessService.update(this.business)
                .subscribe((business: Business) => this.business = business);
            }
          }, (err => console.log(err)));

        }, (err => console.log(err)));
          // () => this.files = []);
    }
  }

  // public uploadFile(diag: any): void {
  //   const fileList: FileList = diag.target.files;
  //   if (fileList.length > 0) {
  //     this.uploadService.getPreSignedUrl(fileList.length)
  //       .then((result: any) => {
  //         const reqs = [];
  //         const photos: Photo[] = [];
  //
  //         for (let i = 0; i < fileList.length; i++) {
  //           const file: File = fileList[i];
  //           // this.spinnerValue.push(0);
  //           // console.log(this.spinnerValue);
  //
  //           const req = this.uploadService.uploadFile(file, result.urls[i]);
  //
  //           this.http.request(req).subscribe(event => {
  //             // Via this API, you get access to the raw event stream.
  //             // Look for upload progress events.
  //             if (event.type === HttpEventType.UploadProgress) {
  //               // This is an upload progress event. Compute and show the % done:
  //               // const percentDone = Math.round(100 * event.loaded / event.total);
  //               // this.spinnerValue[i] = Math.round(100 * event.loaded / event.total);
  //               // console.log(this.spinnerValue[i]);
  //               // console.log(`File is ${percentDone}% uploaded.`);
  //             } else if (event instanceof HttpResponse) {
  //               // console.log('File is completely uploaded!');
  //               this.business.photos.push(this.addPhotos(result.files[i]));
  //               // this.businessService.update(this.business)
  //               //   .then((business: Business) => this.business = business,
  //               //         err => console.log(err));
  //             }
  //           });
  //
  //
  //           // reqs.push(this.uploadService.uploadFile(file, result.urls[i]));
  //           // photos.push(this.addPhotos(result.files[i]));
  //         }
  //         // Hi, this order is from Trevis Baker.  This gift is for my wife Natasha Baker.
  //         // The anon. letter category we prefer is C-Section.  Thank you, and God bless.
  //         // Observable.forkJoin(reqs)
  //         //   .subscribe(() => {
  //         //     this.business.photos = photos;
  //         //                 this.businessService.update(this.business)
  //         //                   .then((business: Business) => {
  //         //                     this.business = business;
  //         //                   });
  //         //   }, err => console.log(err));
  //
  //         //       Observable.forkJoin([])
  //         //         .subscribe(() => {
  //         //             this.business.photos.push(this.addPhoto(url));
  //         //             this.businessService.update(this.business)
  //         //               .then((business: Business) => {
  //         //                 this.business = business;
  //         //               });
  //         //           },
  //         //           err => console.log(err));
  //         //         })
  //         //
  //         //
  //         //
  //         //     });
  //         // }
  //       });
  //   }
  // }

  private addPhoto(filename: string, url?: string): Photo {
    return {
      publisher: this.user.id,
      url: url || `${CONFIG.imgix.host}/${filename}`
    };
  }
}
