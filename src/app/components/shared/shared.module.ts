import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AlertComponent } from './alert';


@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule
  ],

  exports: [
    AlertComponent
  ]
})
export class SharedModule { }
