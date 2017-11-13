import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AccountLoginComponent } from './account-login.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule
  ],
  declarations: [
    AccountLoginComponent
  ],
  exports: [
    AccountLoginComponent
  ]
})
export class AccountLoginModule { }
