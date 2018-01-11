import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CONFIG } from './config';

@Injectable()
export class UploadService {

  constructor(private http: HttpClient) { }


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

    // this.http.request(req).subscribe(event => {
    //   // Via this API, you get access to the raw event stream.
    //   // Look for upload progress events.
    //   if (event.type === HttpEventType.UploadProgress) {
    //     // This is an upload progress event. Compute and show the % done:
    //     const percentDone = Math.round(100 * event.loaded / event.total);
    //     console.log(`File is ${percentDone}% uploaded.`);
    //   } else if (event instanceof HttpResponse) {
    //     console.log('File is completely uploaded!');
    //   }
    // });
  }

  public uploadWidget(cb: any): any {
    return cloudinary.openUploadWidget(
      {
        cloud_name: CONFIG.cloudinary.cloud_name,
        upload_preset: CONFIG.cloudinary.upload_preset
      },
      (err, result) => {
        if (err) {
          return cb(err);
        }
        return cb(undefined, result);
      });
  }
}
