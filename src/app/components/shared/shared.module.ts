import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { NgxCurrencyModule } from 'ngx-currency';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatProgressButtonsModule } from 'mat-progress-buttons';
import { AngularMaterialModule } from './angular-material/angular-material.module';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    DataTablesModule,
    NgxMaskModule.forRoot(),
    FullCalendarModule,
    NgxCurrencyModule,
    MatTooltipModule,
    FontAwesomeModule,
    MatProgressButtonsModule.forRoot()
  ],

  exports: [
    DataTablesModule,
    NgxMaskModule,
    FullCalendarModule,
    NgxCurrencyModule,
    MatTooltipModule,
    AngularMaterialModule,
    FontAwesomeModule,
    MatProgressButtonsModule
  ]
})
export class SharedModule {


}
