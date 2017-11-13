import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ConfirmDialogComponent as ConfirmDialog } from '../confirm-dialog/confirm-dialog.component';
import { CONFIG } from '../../core/config';

@Injectable()
export class DialogsService {

  constructor(private dialog: MatDialog) { }

  public confirmation(
    title: string,
    message: string,
    actionConfirm: string,
    actionCancel?: string,
    hasBackdrop?: boolean,
    disableClose?: boolean
  ): Observable<boolean> {

    let dialogRef: MatDialogRef<ConfirmDialog>;

    dialogRef = this.dialog.open(ConfirmDialog, {
      hasBackdrop: hasBackdrop || CONFIG.dialog.confirm.hasBackdrop,
      disableClose: disableClose || CONFIG.dialog.confirm.disableClose,
      width: CONFIG.dialog.confirm.width
    });
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.actionCancel = actionCancel || 'Cancel';
    dialogRef.componentInstance.actionConfirm = actionConfirm;

    return dialogRef.afterClosed();
  }
}
