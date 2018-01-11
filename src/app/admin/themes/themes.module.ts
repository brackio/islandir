import { NgModule } from '@angular/core';
import { CovalentDialogsModule } from '@covalent/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { ThemesRoutingModule } from './themes-routing.module';
import { ThemeListComponent } from './theme-list/theme-list.component';
import { ThemeEditComponent } from './theme-edit/theme-edit.component';

import { ThemeService } from '../../models/themes/theme.service';
import { ThemeResolverService } from './shared/theme-resolver.service';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    CovalentDialogsModule,
    ThemesRoutingModule
  ],
  declarations: [
    ThemeListComponent,
    ThemeEditComponent
  ],
  providers: [
    ThemeService,
    ThemeResolverService
  ]
})
export class ThemesModule { }
