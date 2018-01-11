import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IslandirMaterialModule } from '../islandir-material/islandir-material.module';
import { SingleImageUploadDirective } from './directives/single-image-upload.directive';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    IslandirMaterialModule
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    IslandirMaterialModule,
    SingleImageUploadDirective
  ],
  declarations: [
    SingleImageUploadDirective
  ]
})
export class SharedModule { }
