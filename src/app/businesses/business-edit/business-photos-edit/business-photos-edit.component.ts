import { Component, OnInit } from '@angular/core';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../user/shared/user';
import { UserService } from '../../../user/shared/user.service';
import { Business, Photo } from '../../shared/business';
import { BusinessService } from '../../shared/business.service';
import { UploadService } from '../../../common/services/upload.service';
import { MessageService } from '../../../core/message.service';
import { CONFIG } from '../../../core/config';

@Component({
  selector: 'ilr-business-photos-edit-',
  templateUrl: './business-photos-edit.component.html',
  styleUrls: ['./business-photos-edit.component.scss']
})

export class BusinessPhotosEditComponent implements OnInit {
  public logoDragOver: boolean = false;
  public coverDragOver: boolean = false;
  public galleryDragOver: boolean = false;
  public logoUploader: FileUploader;
  public coverUploader: FileUploader;
  public galleryUploader: FileUploader;
  public business: Business;
  public user: User;
  public acceptedMimeTypes = [
    'image/gif',
    'image/jpeg',
    'image/png'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private uploadService: UploadService,
    private alertService: MessageService,
    private businessService: BusinessService,
    private cloudinary: Cloudinary
  ) { }

  ngOnInit(): void {
    this.user = this.userService.currentUser;
    this.route.parent.parent.data
      .subscribe((data: { business: Business }) => {
        this.business = data.business;
      });

    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      autoUpload: true,
      isHTML5: true,
      removeAfterUpload: true,
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };
    this.logoUploader = new FileUploader(uploaderOptions);
    this.coverUploader = new FileUploader(uploaderOptions);
    this.galleryUploader = new FileUploader(uploaderOptions);

    this.logoUploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      const tags = `${this.business.slug},${this.user.id},logo`;
      form.append('folder', `${CONFIG.appname}/${this.business.slug}`);
      form.append('tags', tags);
      form.append('file', fileItem);

      fileItem.withCredentials = false;
      return {fileItem, form};
    };

    this.logoUploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
      const data = JSON.parse(response);

      const photo: Photo = {
        public_id: data.public_id,
        filename: data.original_filename,
        publisher: this.user.id,
        url: data.secure_url,
        tags: data.tags
      };

      this.business.photos.logo = photo;
      this.businessService.update(this.business)
        .subscribe((business: Business) => this.business = business);
    };

    this.coverUploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      const tags = `${this.business.slug},${this.user.id},cover`;
      form.append('folder', `${CONFIG.appname}/${this.business.slug}`);
      form.append('tags', tags);
      form.append('file', fileItem);

      fileItem.withCredentials = false;
      return {fileItem, form};
    };

    this.coverUploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
      const data = JSON.parse(response);

      console.log(data);

      const photo: Photo = {
        public_id: data.public_id,
        filename: data.original_filename,
        publisher: this.user.id,
        url: data.secure_url,
        tags: data.tags
      };

      this.business.photos.cover = photo;
      this.businessService.update(this.business)
        .subscribe((business: Business) => this.business = business);
    };

    this.galleryUploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      const tags = `${this.business.slug},${this.user.id},gallery`;
      form.append('folder', `${CONFIG.appname}/${this.business.slug}`);
      form.append('tags', tags);
      form.append('file', fileItem);

      fileItem.withCredentials = false;
      return {fileItem, form};
    };

    this.galleryUploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
      const data = JSON.parse(response);

      const photo: Photo = {
        public_id: data.public_id,
        filename: data.original_filename,
        publisher: this.user.id,
        url: data.secure_url,
        tags: data.tags
      };

      this.business.photos.gallery.push(photo);
      this.businessService.update(this.business)
        .subscribe((business: Business) => this.business = business);
    };

  }

  get hasLogo(): boolean {
    return (!!this.business.photos) && (!!this.business.photos.logo) && (!this.business.photos.logo.archivedOn);
  }
  get hasCover(): boolean {
    return (!!this.business.photos) && (!!this.business.photos.cover) && (!this.business.photos.cover.archivedOn);
  }

  // Delete an uploaded image
  // Requires setting "Return delete token" to "Yes" in your upload preset configuration
  // See also https://support.cloudinary.com/hc/en-us/articles/202521132-How-to-delete-an-image-from-the-client-side-
  deleteImage = function (data: any, index: number) {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/delete_by_token`;
    const headers = new Headers({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' });
    const options = { headers: headers };
    const body = {
      token: data.delete_token
    };
    this.http.post(url, body, options).subscribe(response => {
      console.log(`Deleted image - ${data.public_id} ${response.result}`);
      // Remove deleted item for responses
      this.responses.splice(index, 1);
    });
  };

  public logoFileOver(e: any): void {
    this.logoDragOver = e;
  }

  public coverFileOver(e: any): void {
    this.coverDragOver = e;
  }

  public galleryFileOver(e: any): void {
    this.galleryDragOver = e;
  }
}
