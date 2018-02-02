import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../core/config';

@Injectable()
export class UploadService {

  constructor(
    private http: HttpClient
  ) { }


  public getPreSignedUrl(): Observable<string> {
    return this.http.get<string>(`${CONFIG.awsPreSignedUrl}`);
  }

  public uploadFile(url: string, file: File): HttpRequest<any> {
    return new HttpRequest('PUT', url, file, {
      reportProgress: true,
      headers: new HttpHeaders()
        .set('Content-Type', file.type)
        .set('noAuth', 'true')
    });
  }

  public uploadWidget(cb: any): any {
    // return cloudinary.openUploadWidget(
    //   {
    //     cloud_name: CONFIG.cloudinary.cloud_name,
    //     upload_preset: CONFIG.cloudinary.upload_preset
    //   },
    //   (err, result) => {
    //     if (err) {
    //       return cb(err);
    //     }
    //     return cb(undefined, result);
    // });
  }
}
