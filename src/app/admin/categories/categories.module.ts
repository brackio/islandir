import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { DialogsModule } from '../../dialogs/dialogs.module';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryResolverService} from './shared/category-resolver.service';

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    DialogsModule,
    CategoriesRoutingModule
  ],
  declarations: [
    CategoryListComponent,
    CategoryEditComponent
  ],
  providers: [
    CategoryResolverService
  ]
})
export class CategoriesModule { }
