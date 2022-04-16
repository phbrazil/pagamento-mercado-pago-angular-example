import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AlertComponent } from './alert';
import { DataTablesModule } from 'angular-datatables';
import { IConfig, NgxMaskModule } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    DataTablesModule,
    NgxMaskModule.forRoot(),
  ],

  exports: [
    AlertComponent,
    DataTablesModule,
    NgxMaskModule
  ]
})
export class SharedModule {


}
