import { NgModule } from '@angular/core';
import { MatDialogModule, MatButtonModule  } from '@angular/material';

import { ConfirmDialogComponent }   from './confirm-dialog/confirm-dialog.component';
import { DialogsService } from './shared/dialog.service';

@NgModule({
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    ConfirmDialogComponent
  ],
  declarations: [
    ConfirmDialogComponent
  ],
  providers: [
    DialogsService
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
})
export class DialogsModule { }
