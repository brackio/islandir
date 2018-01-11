import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CovalentDialogsModule } from '@covalent/core';

import { SharedModule } from '../../shared/shared.module';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';

import { CategoryService } from '../../models/categories/category.service';
import { CategoryResolverService} from './shared/category-resolver.service';

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    CovalentDialogsModule,
    CategoriesRoutingModule
  ],
  declarations: [
    CategoryListComponent,
    CategoryEditComponent
  ],
  providers: [
    CategoryService,
    CategoryResolverService
  ]
})
export class CategoriesModule { }
