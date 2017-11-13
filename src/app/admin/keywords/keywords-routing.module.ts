import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeywordListComponent } from './keyword-list/keyword-list.component';
import { KeywordEditComponent } from './keyword-edit/keyword-edit.component';
import { CanDeactivateGuard } from '../../core/can-deactivate-guard.service';
import { KeywordResolverService } from './shared/keyword-resolver.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':id',
        component: KeywordEditComponent,
        canDeactivate: [ CanDeactivateGuard ],
        resolve: {
          keyword: KeywordResolverService
        }
      },
      { path: '', component: KeywordListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeywordsRoutingModule { }
