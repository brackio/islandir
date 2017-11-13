import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MessageComponent } from './message.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule
  ],
  declarations: [
    MessageComponent
  ],
  exports: [
    MessageComponent
  ]
})
export class MessageModule { }
