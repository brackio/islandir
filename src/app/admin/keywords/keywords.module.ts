import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogsModule } from '../../dialogs/dialogs.module';
import { SharedModule } from '../../shared/shared.module';
import { KeywordsRoutingModule } from './keywords-routing.module';

import { KeywordListComponent } from './keyword-list/keyword-list.component';
import { KeywordEditComponent } from './keyword-edit/keyword-edit.component';

import { KeywordResolverService } from './shared/keyword-resolver.service';

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    DialogsModule,
    KeywordsRoutingModule
  ],
  declarations: [
    KeywordListComponent,
    KeywordEditComponent
  ],
  providers: [
    KeywordResolverService
  ]
})
export class KeywordsModule { }
