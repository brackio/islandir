import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IslandirMaterialModule } from '../islandir-material/islandir-material.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    IslandirMaterialModule
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    IslandirMaterialModule
  ]
})
export class SharedModule { }
