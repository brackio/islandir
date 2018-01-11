import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CovalentDialogsModule } from '@covalent/core';
import { SharedModule } from '../../shared/shared.module';
import { KeywordsRoutingModule } from './keywords-routing.module';

import { KeywordListComponent } from './keyword-list/keyword-list.component';
import { KeywordEditComponent } from './keyword-edit/keyword-edit.component';

import { KeywordResolverService } from './shared/keyword-resolver.service';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    CovalentDialogsModule,
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
