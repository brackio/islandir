import { Injectable, ViewContainerRef, Component } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ConfirmDialogComponent as ConfirmDialog } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { CONFIG } from './config';
import {ComponentType} from '@angular/cdk/portal';

@Injectable()
export class DialogsService {
  private isMobileView = false;

  constructor(
    private dialog: MatDialog,
    private media: ObservableMedia
  ) {
    this.isMobileView = (this.media.isActive('xs') || this.media.isActive('sm'));

    this.media.subscribe((change: MediaChange) => {
      this.isMobileView = (change.mqAlias === 'xs' || change.mqAlias === 'sm');
    });
  }

  public componentDialogConfig(data: any): {} {
    return {
      hasBackdrop: true,
      disableClose: true,
      width: this.isMobileView ? '100vw' : '',
      minWidth: !this.isMobileView ? 464 : 'none',
      maxWidth: this.isMobileView ? '100vw' : '80vw',
      height: this.isMobileView ? '100vh' : 'auto',
      data: data
    };
  }

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
