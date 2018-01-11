import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThemeEditComponent } from './theme-edit/theme-edit.component';
import { CanDeactivateGuard } from '../../core/can-deactivate-guard.service';
import { ThemeListComponent } from './theme-list/theme-list.component';
import { ThemeResolverService } from './shared/theme-resolver.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':id',
        component: ThemeEditComponent,
        canDeactivate: [ CanDeactivateGuard ],
        resolve: {
          theme: ThemeResolverService
        },
      },
      { path: '', component: ThemeListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemesRoutingModule { }
