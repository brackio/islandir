import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

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
}
