import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopicListComponent } from './topic-list/topic-list.component';
import { TopicEditComponent } from './topic-edit/topic-edit.component';
import { TopicResolverService } from './shared/topic-resolver.service';
import { CanDeactivateGuard } from '../../core/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':id',
        component: TopicEditComponent,
        canDeactivate: [ CanDeactivateGuard ],
        resolve: {
          topic: TopicResolverService
        },
      },
      { path: '', component: TopicListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicsRoutingModule { }
