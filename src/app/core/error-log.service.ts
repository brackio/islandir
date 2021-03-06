import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorLogService {

  constructor() {}

  private name: String = 'ErrorLogService';

  public logError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      console.error('There was an HTTP error.', error.message, 'Status code:', (<HttpErrorResponse>error).status);
    } else if (error instanceof TypeError) {
      console.error('There was a Type error.', error.message);
    } else if (error instanceof Error) {
      console.error('There was a general error.', error.message);
    } else {
      console.error(error);
    }
  }
}
