import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../user/shared/user';
import { UserService } from '../../../user/shared/user.service';
import { Business, Photo } from '../../shared/business';
import { BusinessService } from '../../shared/business.service';

@Component({
  selector: 'ilr-business-photos-edit-',
  templateUrl: './business-photos-edit.component.html',
  styleUrls: ['./business-photos-edit.component.scss']
})

export class BusinessPhotosEditComponent implements OnInit {
  public business: Business;
  public user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private businessService: BusinessService,
  ) { }

  ngOnInit(): void {
    this.user = this.userService.currentUser;
    this.route.parent.parent.data
      .subscribe((data: { business: Business }) => {
        this.business = data.business;
      });
  }

  // Delete an uploaded image
  // Requires setting "Return delete token" to "Yes" in your upload preset configuration
  // See also https://support.cloudinary.com/hc/en-us/articles/202521132-How-to-delete-an-image-from-the-client-side-
  /*deleteImage = function (data: any, index: number) {
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
  };*/

  private getPhoto(data: any): Photo {
    return {
      public_id: data.public_id,
      filename: data.original_filename,
      publisher: this.user.id,
      url: data.secure_url,
      tags: data.tags
    } as Photo;
  }

  public getLogo(): string[] {
    if (this.business.photos && this.business.photos.logo) {
      return [this.business.photos.logo.public_id];
    }
    return null;
  }

  public getCover(): string[] {
    if (this.business.photos && this.business.photos.cover) {
      return [this.business.photos.cover.public_id];
    }
    return null;
  }

  public getGallery(): string[] {
    const images = [];
    if (this.business.photos && this.business.photos.gallery) {
      this.business.photos.gallery.forEach(photo => {
        images.push(photo.public_id);
      });
    }
    return images;
  }

  public saveLogoImage(data: any): void {
    this.business.photos.logo = this.getPhoto(data);
    this.businessService.update(this.business)
      .subscribe((business: Business) => this.business = business);
  }

  public saveCoverImage(data: any): void {
    this.business.photos.cover = this.getPhoto(data);
    this.businessService.update(this.business)
      .subscribe((business: Business) => this.business = business);
  }

  public saveGalleryImages(data: any): void {
    this.business.photos.gallery.push(this.getPhoto(data));
    this.businessService.update(this.business)
      .subscribe((business: Business) => this.business = business);
  }
}
