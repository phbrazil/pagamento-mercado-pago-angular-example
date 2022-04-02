import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { TimeComponent } from './time/time.component';
import { AdvanceComponent } from './advance/advance.component';
import { RefundComponent } from './refund/refund.component';
import { ManageComponent } from './manage/manage.component';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { ProfileComponent } from './profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faFilm, faFish } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { NewEntryComponent } from './time/new-entry/new-entry.component';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import {  NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TasksComponent } from './time/tasks/tasks.component';
import { LoggedFooterComponent } from './logged-footer/logged-footer.component';

@NgModule({
  declarations: [
    NavbarComponent,
    TimeComponent,
    AdvanceComponent,
    RefundComponent,
    ManageComponent,
    DashboardsComponent,
    ProfileComponent,
    NewEntryComponent,
    TasksComponent,
    LoggedFooterComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FontAwesomeModule,
    AngularMaterialModule,
    NgbDatepickerModule,
    NgSelectModule
  ], exports: [
    NavbarComponent,
    TimeComponent,
    AdvanceComponent
  ],
})
export class AdminLayoutModule {

  constructor() {
    library.add(faFilm, faFish, faCoffee);
  }

}
