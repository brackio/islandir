import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
} from '@angular/material';


@Injectable()
export class AlertService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  public saving(): void {
    this.snackBar.open('Saving...', null, { duration: 3000 });
  }

  public saveComplete(): void {
    this.snackBar.open('Saved!', null, { duration: 5000 });
  }

  public deleteAction(): void {
    this.snackBar.open('Item removed.', null, { duration: 5000 });
  }

  public toast(message: string): void {
    this.snackBar.open(message, null, { duration: 5000 });
  }

  public error(message: string): void {
    this.snackBar.open(message || 'The server encountered an error. Please try again later.', 'DISMISS', { duration: 10000 });
  }

  public notFound(item: string): void {
    this.snackBar.open(`${item} was not found.`, null, { duration: 5000 });
  }

  public action(message: string, action: string): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, { duration: 5000 });
  }
}
